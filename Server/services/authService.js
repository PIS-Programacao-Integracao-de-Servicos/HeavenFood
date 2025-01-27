const bcrypt = require('bcryptjs');
const authModel = require('../models/authModel');

const signup = async (nome, email, senha) => {
    const existingUser = await authModel.findUserByEmail(email);

    if (existingUser.length > 0) {
        throw new Error('Email já registado!');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    await authModel.insertUser(nome, email, hashedPassword);
};

const login = async (email, senha) => {
    const [user] = await authModel.findUserByEmail(email);

    if (!user) {
        throw new Error('Utilizador não encontrado!');
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha_hash);

    if (!isPasswordValid) {
        throw new Error('Senha incorreta!');
    }

    return user;
};

const logout = (req) => {
    return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

const checkSession = (req) => {
    if (req.session.user) {
        return { loggedIn: true, user: req.session.user };
    }
    return { loggedIn: false };
};

module.exports = {
    signup,
    login,
    logout,
    checkSession,
};
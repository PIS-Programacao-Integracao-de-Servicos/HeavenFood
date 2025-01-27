const db = require('../config/dbConnection');

const findUserByEmail = async (email) => {
    const [results] = await db.promise().query('SELECT * FROM Utilizadores WHERE email = ?', [email]);
    return results;
};

const insertUser = async (nome, email, senha_hash) => {
    await db.promise().query('INSERT INTO Utilizadores (nome, email, senha_hash) VALUES (?, ?, ?)', [nome, email, senha_hash]);
};

module.exports = {
    findUserByEmail,
    insertUser,
};
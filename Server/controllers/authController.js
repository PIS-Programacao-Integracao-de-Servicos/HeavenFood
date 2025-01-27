const authService = require('../services/authService');

const signup = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        await authService.signup(nome, email, senha);
        res.status(201).json({ message: 'Utilizador registado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registar utilizador:', error.message);
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await authService.login(email, senha);
        req.session.user = { id: user.id, nome: user.nome, isAdmin: user.administrador };
        res.status(200).json({ message: 'Login efetuado com sucesso!', user });
    } catch (error) {
        console.error('Erro ao efetuar login:', error.message);
        res.status(500).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        await authService.logout(req);
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Sessão encerrada com sucesso' });
    } catch (error) {
        console.error('Erro ao encerrar sessão:', error.message);
        res.status(500).json({ message: 'Erro ao encerrar sessão' });
    }
};

const checkSession = (req, res) => {
    const sessionData = authService.checkSession(req);
    res.status(200).json(sessionData);
};

module.exports = {
    signup,
    login,
    logout,
    checkSession,
};
const express = require('express');
const router = express.Router();
const { signup, login } = require('../modules/authModule');
const path = require('path');

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Client/html/signup.html'));
});

router.post('/signup', signup);

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Client/html/login.html'))
});

router.post('/login', login);

router.get('/session', (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ loggedIn: true, user: req.session.user });
  }
  res.status(200).json({ loggedIn: false });
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao encerrar sessão' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Sessão encerrada com sucesso' });
  });
});
router.get('/profile', (req, res) => {
  if (req.session.user) {
    return res.status(200).json({
      name: req.session.user.name,
      email: req.session.user.email,
    });
  }
  return res.status(401).json({ message: 'Utilizador não autenticado.' });
});

module.exports = router;
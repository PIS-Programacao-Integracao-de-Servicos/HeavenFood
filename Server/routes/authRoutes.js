const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Client/html/signup.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Client/html/login.html'))
});

router.get('/session', authController.checkSession);

module.exports = router;
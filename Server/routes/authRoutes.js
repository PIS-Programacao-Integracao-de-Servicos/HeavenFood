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

module.exports = router;
const express = require('express');
const router = express.Router();
const { signup, login } = require('../modules/authModule');

// Rota de registo (signup)
router.post('/signup', signup);

// Rota de login
router.post('/login', login);

module.exports = router;
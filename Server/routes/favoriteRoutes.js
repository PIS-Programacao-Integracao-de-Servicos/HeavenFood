const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

router.post('/add', favoriteController.addFavorite);
router.delete('/remove', favoriteController.removeFavorite);
router.get('/:utilizador_id', favoriteController.getFavoritesByUserId);

module.exports = router;
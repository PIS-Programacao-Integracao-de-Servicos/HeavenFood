const express = require('express');
const recipeController = require('../controllers/recipeController');
const router = express.Router();

router.get('/highlight', recipeController.getRecipes);
router.get('/all', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);

module.exports = router;    
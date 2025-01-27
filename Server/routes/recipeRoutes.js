const express = require('express');
const recipeController = require('../controllers/recipeController');
const router = express.Router();

router.get('/highlight', recipeController.getRecipes);
router.get('/all', recipeController.getAllRecipes);
router.get('/search/:nome', recipeController.getRecipeByName);
router.get('/categories', recipeController.getAllCategories);
router.get('/categories/:id', recipeController.getRecipeByCategoryId);
router.get('/:id', recipeController.getRecipeById);

module.exports = router;    
const express = require('express');
const router = express.Router();
const { getRecipes, getRecipeCategories } = require('../modules/recipeModule');

// Rota para listar receitas
router.get('/recipes', getRecipes);

// Rota para listar categorias de receitas
router.get('/categories', getRecipeCategories);

module.exports = router;

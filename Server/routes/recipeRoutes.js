const express = require('express');
const recipeController = require('../controllers/recipeController');
const router = express.Router();

router.get('/highlight', recipeController.getRecipes);
router.get('/all', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.post('/add', recipeController.addRecipe);
router.put('/update/:id', recipeController.updateRecipe);
router.delete('/delete/:id', recipeController.deleteRecipe);
router.get('/allWithDetails', recipeController.getAllRecipesWithDetails);



module.exports = router;    
const express = require('express');
const router = express.Router();
const importRecipeController = require('../controllers/importRecipeController');

router.get('/data', importRecipeController.importRecipes);

module.exports = router;    
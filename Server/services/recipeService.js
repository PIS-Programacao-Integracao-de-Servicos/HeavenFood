const axios = require('axios');
const https = require('https');
const recipeModel = require('../models/recipeModel');

const getRecipes = async () => {
    const dbResults = await recipeModel.getAllRecipes();

    const agent = new https.Agent({
        rejectUnauthorized: false,
    });

    const apiResponse = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=', {
        httpsAgent: agent,
    });
    const apiRecipes = apiResponse.data.meals || [];

    const formattedApiRecipes = apiRecipes.map((meal) => ({
        id: meal.idMeal,
        nome: meal.strMeal,
        descricao_preparacao: meal.strInstructions,
        categoria: meal.strCategory,
        image_url: meal.strMealThumb,
    }));

    return [...dbResults, ...formattedApiRecipes].slice(0, 4);
};

const getAllRecipes = async () => {
    const dbResults = await recipeModel.getAllRecipes();

    const agent = new https.Agent({
        rejectUnauthorized: false,
    });

    const apiResponse = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=', {
        httpsAgent: agent,
    });
    const apiRecipes = apiResponse.data.meals || [];

    const formattedApiRecipes = apiRecipes.map((meal) => ({
        id: parseInt(meal.idMeal),
        nome: meal.strMeal,
        categoria: meal.strCategory,
        image_url: meal.strMealThumb,
        source: 'api'
    }));

    const formattedDbResults = dbResults.map(recipe => ({
        ...recipe,
        id: recipe.id,
        source: 'db'
    }));

    const combinedRecipes = [...formattedApiRecipes, ...formattedDbResults];
    const uniqueRecipes = Array.from(new Map(combinedRecipes.map(recipe => [recipe.id, recipe])).values());
    console.log(uniqueRecipes);
    return uniqueRecipes;
};

module.exports = {
    getRecipes,
    getAllRecipes,
};
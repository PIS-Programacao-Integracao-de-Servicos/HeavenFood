const axios = require('axios');
const https = require('https');
const recipeModel = require('../models/recipeModel');
const db = require('../config/dbConnection');

const getRecipes = async () => {
    let dbResults = await recipeModel.getAllRecipes();
    dbResults = Array.isArray(dbResults) ? dbResults : [];
    let apiRecipes = [];
    try {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });

        const apiResponse = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=', {
            httpsAgent: agent,
        });
        apiRecipes = apiResponse.data.meals || [];

    } catch (error) {
        console.error('Erro ao buscar todas as receitas na API:', error.message);
    }

    const formattedApiRecipes = apiRecipes.map((meal) => ({
        id: parseInt(meal.idMeal),
        nome: meal.strMeal,
        categoria: meal.strCategory,
        image_url: meal.strMealThumb,
        source: 'api'
    }));

    return [...dbResults, ...formattedApiRecipes].slice(0, 4);
};

const getAllRecipes = async () => {
    let dbResults = await recipeModel.getAllRecipes();
    dbResults = Array.isArray(dbResults) ? dbResults : [];
    let apiRecipes = [];
    try {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });

        const apiResponse = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=', {
            httpsAgent: agent,
        });
        apiRecipes = apiResponse.data.meals || [];

    } catch (error) {
        console.error('Erro ao buscar todas as receitas na API:', error.message);
    }

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

const getRecipeByName = async (name) => {
    let apiRecipes = [];
    try {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });

        const apiResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`, {
            httpsAgent: agent,
        });
        apiRecipes = apiResponse.data.meals || [];

    } catch (error) {
        console.error('Erro ao buscar todas as receitas na API:', error.message);
    }

    const formattedApiRecipes = apiRecipes.map((meal) => ({
        id: parseInt(meal.idMeal),
        nome: meal.strMeal,
        categoria: meal.strCategory,
        image_url: meal.strMealThumb,
        source: 'api'
    }));

    return [formattedApiRecipes];
}




module.exports = {
    getRecipes,
    getAllRecipes,
    getRecipeByName,
};
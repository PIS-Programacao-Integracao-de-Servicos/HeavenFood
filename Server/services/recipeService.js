const axios = require('axios');
const https = require('https');
const recipeModel = require('../models/recipeModel');

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

const getRecipeById = async (id) => {
    try {
        const dbRecipe = await recipeModel.getRecipeById(id);
        console.log('DB Recipe:', dbRecipe);

        const agent = new https.Agent({
            rejectUnauthorized: false,
        });

        const apiResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, {
            httpsAgent: agent,
        });
        const apiRecipe = apiResponse.data.meals ? apiResponse.data.meals[0] : null;
        console.log('API Recipe:', apiRecipe);

        if (apiRecipe) {
            const ingredientes = dbRecipe.ingredientes.map(ingredient => ({
                ...ingredient,
                image_url: `https://www.themealdb.com/images/ingredients/${ingredient.ingrediente}-Small.png`
            }));

            return {
                ...dbRecipe,
                youtube_link: apiRecipe.strYoutube,
                localidade: apiRecipe.strArea,
                ingredientes
            };
        }

        return {
            ...dbRecipe,
            ingredientes: dbRecipe.ingredientes.map(ingredient => ({
                ...ingredient,
                image_url: `https://www.themealdb.com/images/ingredients/${ingredient.ingrediente}-Small.png`
            }))
        };
    } catch (error) {
        console.error('Erro ao buscar detalhes da receita:', error);
        throw error;
    }
};

module.exports = {
    getRecipes,
    getAllRecipes,
    getRecipeById,
};
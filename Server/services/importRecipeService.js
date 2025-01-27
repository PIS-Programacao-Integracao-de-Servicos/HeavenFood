const axios = require('axios');
const https = require('https');
const importRecipeModel = require('../models/importRecipeModel');

const importRecipes = async () => {
    const axiosInstance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    });

    const response = await axiosInstance.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const recipes = response.data.meals;

    if (!recipes) {
        throw new Error('Nenhuma receita encontrada na API externa.');
    }

    for (const recipe of recipes) {
        const { idMeal, strMeal, strCategory, strInstructions, strMealThumb } = recipe;

        // Valores padrão para os dados null
        const autor = 'Desconhecido';
        const dificuldade = 'Média';
        const tempo = 0; 
        const custo = 0.00; 

        let categoryResult = await importRecipeModel.findCategoryByName(strCategory);
        let categoryId;
        if (categoryResult.length === 0) {
            categoryId = await importRecipeModel.insertCategory(strCategory);
        } else {
            categoryId = categoryResult[0].id;
        }

        await importRecipeModel.insertRecipe({
            idMeal,
            strMeal,
            strInstructions,
            categoryId,
            strMealThumb,
            autor,
            dificuldade,
            tempo,
            custo
        });

        for (let i = 1; i <= 20; i++) {
            const ingredientName = recipe[`strIngredient${i}`];
            const ingredientMeasure = recipe[`strMeasure${i}`];

            if (ingredientName && ingredientName.trim() !== '') {
                let ingredientResult = await importRecipeModel.findIngredientByName(ingredientName);
                let ingredientId;
                if (ingredientResult.length === 0) {
                    ingredientId = await importRecipeModel.insertIngredient(ingredientName);
                } else {
                    ingredientId = ingredientResult[0].id;
                }

                let recipeIngredientResult = await importRecipeModel.findRecipeIngredient(idMeal, ingredientId);
                if (recipeIngredientResult.length === 0) {
                    await importRecipeModel.insertRecipeIngredient(idMeal, ingredientId, ingredientMeasure);
                }
            }
        }
    }
};

module.exports = {
    importRecipes,
};
const express = require('express');
const axios = require('axios');
const https = require('https');
const db = require('../dbConnection');

const router = express.Router();

// Rota para obter receitas limitadas (usada no homepage)
router.get('/highlight', async (req, res) => {
    try {
        const query = `
            SELECT 
                Receita.id,
                Receita.image_url,
                Receita.nome,
                Receita.descricao_preparacao, 
                Categorias.nome AS categoria 
            FROM Receita 
            LEFT JOIN Categorias ON Receita.categoria_id = Categorias.id
        `;

        const [dbResults] = await db.promise().query(query);

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

        // Limitar a 4 receitas
        const combinedRecipes = [...dbResults, ...formattedApiRecipes].slice(0, 4);

        res.status(200).json(combinedRecipes);
    } catch (error) {
        console.error('Erro ao buscar receitas de destaque:', error.message);
        res.status(500).json({ message: 'Erro ao buscar receitas de destaque.' });
    }
});

// Rota para obter todas as receitas (usada na página de receitas)
router.get('/all', async (req, res) => {
    let dbResults = [];
    let apiRecipes = [];
    try {
        const query = `
            SELECT 
                Receita.id,
                Receita.image_url,
                Receita.nome,
                Categorias.nome AS categoria 
            FROM Receita    
            LEFT JOIN Categorias ON Receita.categoria_id = Categorias.id
        `;

        [dbResults] = await db.promise().query(query);
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error.message);
    }
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

    console.log(uniqueRecipes)
    res.status(200).json(uniqueRecipes);

});

// Rota para obter os detalhes de uma receita
router.get('/details/:id', async (req, res) => {
    const recipeId = req.params.id;

    if (!recipeId) {
        return res.status(400).json({ message: 'ID da receita não fornecido.' });
    }

    try {
        const query = `
            SELECT 
                Receita.id, 
                Receita.nome, 
                Receita.descricao_preparacao, 
                RecipeCategories.nome AS categoria,
                GROUP_CONCAT(Ingredientes.nome SEPARATOR ', ') AS ingredientes
            FROM Receita
            LEFT JOIN RecipeCategories ON Receita.categoria_id = RecipeCategories.id
            LEFT JOIN ReceitaIngredientes ON Receita.id = ReceitaIngredientes.receita_id
            LEFT JOIN Ingredientes ON ReceitaIngredientes.ingrediente_id = Ingredientes.id
            WHERE Receita.id = ?
            GROUP BY Receita.id
        `;

        const [result] = await new Promise((resolve, reject) => {
            db.query(query, [recipeId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        if (!result) {
            return res.status(404).json({ message: 'Receita não encontrada.' });
        }

        res.status(200).json({
            id: result.id,
            nome: result.nome,
            imagem_url: result.imagem_url,
            descricao_preparacao: result.descricao_preparacao,
            categoria: result.categoria,
            ingredientes: result.ingredientes ? result.ingredientes.split(', ') : [],
        });
    } catch (error) {
        console.error('Erro ao buscar detalhes da receita:', error.message);
        res.status(500).json({ message: 'Erro ao buscar detalhes da receita.' });
    }
});



module.exports = router;
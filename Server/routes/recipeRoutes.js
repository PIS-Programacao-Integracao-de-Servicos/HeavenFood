const express = require('express');
const axios = require('axios');
const https = require('https');
const db = require('../dbConnection');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                Receita.id, 
                Receita.nome, 
                Receita.descricao_preparacao, 
                Categorias.nome AS categoria 
            FROM Receita 
            LEFT JOIN Categorias ON Receita.categoria_id = Categorias.id
        `;

        const [dbResults] = await new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) return reject(err);
                resolve([results]);
            });
        });

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
        }));

        const combinedRecipes = [...dbResults, ...formattedApiRecipes];

        res.status(200).json(combinedRecipes);
    } catch (error) {
        console.error('Erro ao buscar receitas:', error.message);
        res.status(500).json({ message: 'Erro ao buscar receitas.' });
    }
});


// Rota para obter receitas limitadas (usada no homepage)
router.get('/highlight', async (req, res) => {
    try {
        const query = `
            SELECT 
                Receita.id, 
                Receita.nome,
                Receita.descricao_preparacao, 
                Categorias.nome AS categoria 
            FROM Receita 
            LEFT JOIN Categorias ON Receita.categoria_id = Categorias.id
        `;

        const [dbResults] = await new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) return reject(err);
                resolve([results]);
            });
        });

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
        }));

        // Limitar a 3 receitas
        const combinedRecipes = [...dbResults, ...formattedApiRecipes].slice(0, 3);

        res.status(200).json(combinedRecipes);
    } catch (error) {
        console.error('Erro ao buscar receitas de destaque:', error.message);
        res.status(500).json({ message: 'Erro ao buscar receitas de destaque.' });
    }
});

// Rota para obter todas as receitas (usada na página de receitas)
router.get('/all', async (req, res) => {
    try {
        const query = `
            SELECT 
                Receita.id,
                Receita.nome, 
                Receita.descricao_preparacao, 
                Categorias.nome AS categoria 
            FROM Receita 
            LEFT JOIN Categorias ON Receita.categoria_id = Categorias.id
        `;

        const [dbResults] = await new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) return reject(err);
                resolve([results]);
            });
        });

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
            imagem_url: `${meal.strMealThumb}/preview`,
        }));

        const combinedRecipes = [...dbResults, ...formattedApiRecipes];

        res.status(200).json(combinedRecipes);
    } catch (error) {
        console.error('Erro ao buscar todas as receitas:', error.message);
        res.status(500).json({ message: 'Erro ao buscar todas as receitas.' });
    }
});

module.exports = router;
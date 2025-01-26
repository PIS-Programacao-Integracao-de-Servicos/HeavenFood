const express = require('express');
const axios = require('axios');
const https = require('https');
const db = require('../dbConnection');
const router = express.Router();

// Configurar Axios para ignorar a verificação do certificado SSL
const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

router.get('/import', async (req, res) => {
    try {
        const response = await axiosInstance.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const recipes = response.data.meals;

        if (!recipes) {
            return res.status(404).json({ message: 'Nenhuma receita encontrada na API externa.' });
        }

        for (const recipe of recipes) {
            const { idMeal, strMeal, strCategory, strInstructions, strMealThumb } = recipe;

            // Valores padrão para os dados null
            const autor = 'Desconhecido';
            const dificuldade = 'Média';
            const tempo = 30; 
            const custo = 10.00; 

            let [categoryResult] = await db.promise().query('SELECT id FROM Categorias WHERE nome = ?', [strCategory]);
            let categoryId;
            if (categoryResult.length === 0) {
                const [insertCategoryResult] = await db.promise().query('INSERT INTO Categorias (nome) VALUES (?)', [strCategory]);
                categoryId = insertCategoryResult.insertId;
            } else {
                categoryId = categoryResult[0].id;
            }

            await db.promise().query(
                'INSERT INTO Receita (id, nome, descricao_preparacao, categoria_id, image_url, autor, dificuldade, tempo, custo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [idMeal, strMeal, strInstructions, categoryId, strMealThumb, autor, dificuldade, tempo, custo]
            );

            for (let i = 1; i <= 20; i++) {
                const ingredientName = recipe[`strIngredient${i}`];
                const ingredientMeasure = recipe[`strMeasure${i}`];

                if (ingredientName && ingredientName.trim() !== '') {
                    let [ingredientResult] = await db.promise().query('SELECT id FROM Ingrediente WHERE nome = ?', [ingredientName]);
                    let ingredientId;
                    if (ingredientResult.length === 0) {
                        const [insertIngredientResult] = await db.promise().query('INSERT INTO Ingrediente (nome) VALUES (?)', [ingredientName]);
                        ingredientId = insertIngredientResult.insertId;
                    } else {
                        ingredientId = ingredientResult[0].id;
                    }

                    // Verificar se a combinação receita_id e ingrediente_id já existe
                    let [recipeIngredientResult] = await db.promise().query(
                        'SELECT * FROM Receita_Ingrediente WHERE receita_id = ? AND ingrediente_id = ?',
                        [idMeal, ingredientId]
                    );

                    if (recipeIngredientResult.length === 0) {
                        await db.promise().query(
                            'INSERT INTO Receita_Ingrediente (receita_id, ingrediente_id, quantidade) VALUES (?, ?, ?)',
                            [idMeal, ingredientId, ingredientMeasure]
                        );
                    }
                }
            }
        }

        res.status(200).json({ message: 'Receitas importadas com sucesso!' });
    } catch (error) {
        console.error('Erro ao importar receitas:', error.message);
        res.status(500).json({ message: 'Erro ao importar receitas.' });
    }
});

module.exports = router;
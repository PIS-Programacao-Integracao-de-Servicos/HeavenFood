const db = require('../config/dbConnection');

const findCategoryByName = async (name) => {
    const [results] = await db.promise().query('SELECT id FROM Categorias WHERE nome = ?', [name]);
    return results;
};

const insertCategory = async (name) => {
    const [results] = await db.promise().query('INSERT INTO Categorias (nome) VALUES (?)', [name]);
    return results.insertId;
};

const insertRecipe = async (recipe) => {
    const { idMeal, strMeal, strInstructions, categoryId, strMealThumb, autor, dificuldade, tempo, custo } = recipe;
    await db.promise().query(
        'INSERT INTO Receita (id, nome, descricao_preparacao, categoria_id, image_url, autor, dificuldade, tempo, custo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [idMeal, strMeal, strInstructions, categoryId, strMealThumb, autor, dificuldade, tempo, custo]
    );
};

const findIngredientByName = async (name) => {
    const [results] = await db.promise().query('SELECT id FROM Ingrediente WHERE nome = ?', [name]);
    return results;
};

const insertIngredient = async (name) => {
    const [results] = await db.promise().query('INSERT INTO Ingrediente (nome) VALUES (?)', [name]);
    return results.insertId;
};

const findRecipeIngredient = async (recipeId, ingredientId) => {
    const [results] = await db.promise().query(
        'SELECT * FROM Receita_Ingrediente WHERE receita_id = ? AND ingrediente_id = ?',
        [recipeId, ingredientId]
    );
    return results;
};

const insertRecipeIngredient = async (recipeId, ingredientId, quantity) => {
    await db.promise().query(
        'INSERT INTO Receita_Ingrediente (receita_id, ingrediente_id, quantidade) VALUES (?, ?, ?)',
        [recipeId, ingredientId, quantity]
    );
};

module.exports = {
    findCategoryByName,
    insertCategory,
    insertRecipe,
    findIngredientByName,
    insertIngredient,
    findRecipeIngredient,
    insertRecipeIngredient,
};
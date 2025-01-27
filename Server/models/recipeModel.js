const db = require('../config/dbConnection');

const getAllRecipes = async () => {
    let results = [];
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

        [results] = await db.promise().query(query);
        return results;
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error.message);
    }
};

const getRecipeById = async (id) => {
    const query = `
        SELECT 
            Receita.id,
            Receita.image_url,
            Receita.nome,
            Receita.descricao_preparacao, 
            Categorias.nome AS categoria 
        FROM Receita 
        LEFT JOIN Categorias ON Receita.categoria_id = Categorias.id
        WHERE Receita.id = ?
    `;
    const [recipeResults] = await db.promise().query(query, [id]);

    const ingredientsQuery = `
        SELECT 
            Ingrediente.nome AS ingrediente,
            Receita_Ingrediente.quantidade AS medida
        FROM Receita_Ingrediente
        JOIN Ingrediente ON Receita_Ingrediente.ingrediente_id = Ingrediente.id
        WHERE Receita_Ingrediente.receita_id = ?
    `;
    const [ingredientsResults] = await db.promise().query(ingredientsQuery, [id]);

    return {
        ...recipeResults[0],
        ingredientes: ingredientsResults
    };
};

const insertRecipe = async (recipe) => {
    const { nome, descricao_preparacao, categoria_id, image_url, autor, dificuldade, tempo, custo } = recipe;
    await db.promise().query(
        'INSERT INTO Receita (nome, descricao_preparacao, categoria_id, image_url, autor, dificuldade, tempo, custo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nome, descricao_preparacao, categoria_id, image_url, autor, dificuldade, tempo, custo]
    );
};

const updateRecipe = async (id, recipe) => {
    const { nome, descricao_preparacao, categoria_id, image_url, autor, dificuldade, tempo, custo } = recipe;
    await db.promise().query(
        'UPDATE Receita SET nome = ?, descricao_preparacao = ?, categoria_id = ?, image_url = ?, autor = ?, dificuldade = ?, tempo = ?, custo = ? WHERE id = ?',
        [nome, descricao_preparacao, categoria_id, image_url, autor, dificuldade, tempo, custo, id]
    );
};

const deleteRecipe = async (id) => {
    await db.promise().query('DELETE FROM Receita WHERE id = ?', [id]);
};

const getAllRecipesWithDetails = async () => {
    const [rows] = await db.promise().query('SELECT id, nome, descricao_preparacao, categoria_id, image_url, autor, dificuldade, tempo, custo FROM Receita');

    return rows;
    
};

const getAllCategories = async () => {
    let results = [];
    try {
        const query = `
            SELECT * FROM Categorias
        `;

        [results] = await db.promise().query(query);
        return results;
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error.message);
    }
};

const getRecipeByCategoryId = async (id) => {
    let results = [];
    try {
        const query = `
            SELECT 
                Receita.id,
                Receita.image_url,
                Receita.nome,
                Categorias.nome AS categoria 
            FROM Receita    
            LEFT JOIN Categorias ON Receita.categoria_id = Categorias.id
            WHERE Receita.categoria_id = ?
        `;

        [results] = await db.promise().query(query, [id]);
        return results;
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error.message);
    }
    
};
module.exports = {
    getRecipeById,
    getAllRecipes,
    getAllCategories,
    getRecipeByCategoryId
    insertRecipe,
    updateRecipe,
    deleteRecipe,
    getAllRecipesWithDetails,
};
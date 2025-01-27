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
    getAllRecipes,
    getAllCategories,
    getRecipeByCategoryId
};
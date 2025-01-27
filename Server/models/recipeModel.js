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

module.exports = {
    getAllRecipes,
    getRecipeById,
};
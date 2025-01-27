const db = require('../config/dbConnection');

const getAllRecipes = async () => {
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
    const [results] = await db.promise().query(query);
    return results;
};

module.exports = {
    getAllRecipes,
};
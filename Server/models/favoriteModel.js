const db = require('../config/dbConnection');

const findFavorite = async (utilizador_id, receita_id) => {
    const [results] = await db.promise().query('SELECT * FROM Favoritos WHERE utilizador_id = ? AND receita_id = ?', [utilizador_id, receita_id]);
    return results;
};

const addFavorite = async (utilizador_id, receita_id) => {
    await db.promise().query('INSERT INTO Favoritos (utilizador_id, receita_id) VALUES (?, ?)', [utilizador_id, receita_id]);
};

const removeFavorite = async (utilizador_id, receita_id) => {
    await db.promise().query('DELETE FROM Favoritos WHERE utilizador_id = ? AND receita_id = ?', [utilizador_id, receita_id]);
};

const getFavoritesByUserId = async (utilizador_id) => {
    const [results] = await db.promise().query(`
        SELECT Receita.id, Receita.nome, Receita.image_url, Categorias.nome AS categoria
        FROM Favoritos
        JOIN Receita ON Favoritos.receita_id = Receita.id
        LEFT JOIN Categorias ON Receita.categoria_id = Categorias.id
        WHERE Favoritos.utilizador_id = ?
    `, [utilizador_id]);
    return results;
};

module.exports = {
    findFavorite,
    addFavorite,
    removeFavorite,
    getFavoritesByUserId,
};
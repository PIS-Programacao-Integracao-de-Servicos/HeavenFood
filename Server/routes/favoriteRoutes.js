const express = require('express');
const router = express.Router();
const db = require('../config/dbConnection');

// Adicionar receita aos favoritos
router.post('/add', async (req, res) => {
    const { utilizador_id, receita_id } = req.body;

    if (!utilizador_id || !receita_id) {
        return res.status(400).json({ message: 'ID do utilizador e ID da receita são necessários.' });
    }

    try {
        const [existingFavorite] = await db.promise().query('SELECT * FROM Favoritos WHERE utilizador_id = ? AND receita_id = ?', [utilizador_id, receita_id]);
        if (existingFavorite.length > 0) {
            return res.status(400).json({ message: 'Receita já está nos favoritos.' });
        }
        
        await db.promise().query('INSERT INTO Favoritos (utilizador_id, receita_id) VALUES (?, ?)', [utilizador_id, receita_id]);
        res.status(200).json({ message: 'Receita adicionada aos favoritos com sucesso.' });
    } catch (error) {
        console.error('Erro ao adicionar receita aos favoritos:', error.message);
        res.status(500).json({ message: 'Erro ao adicionar receita aos favoritos.' });
    }
});

// Remover receita dos favoritos
router.delete('/remove', async (req, res) => {
    const { utilizador_id, receita_id } = req.body;

    if (!utilizador_id || !receita_id) {
        return res.status(400).json({ message: 'ID do utilizador e ID da receita são necessários.' });
    }

    try {
        await db.promise().query('DELETE FROM Favoritos WHERE utilizador_id = ? AND receita_id = ?', [utilizador_id, receita_id]);
        res.status(200).json({ message: 'Receita removida dos favoritos com sucesso.' });
    } catch (error) {
        console.error('Erro ao remover receita dos favoritos:', error.message);
        res.status(500).json({ message: 'Erro ao remover receita dos favoritos.' });
    }
});

// Obter lista de favoritos de um utilizador
router.get('/:utilizador_id', async (req, res) => {
    const utilizador_id = req.params.utilizador_id;

    if (!utilizador_id) {
        return res.status(400).json({ message: 'ID do utilizador é necessário.' });
    }

    try {
        const [results] = await db.promise().query(`
            SELECT Receita.id, Receita.nome, Receita.image_url, Categorias.nome AS categoria
            FROM Favoritos
            JOIN Receita ON Favoritos.receita_id = Receita.id
            LEFT JOIN Categorias ON Receita.categoria_id = Categorias.id
            WHERE Favoritos.utilizador_id = ?
        `, [utilizador_id]);

        res.status(200).json(results);
    } catch (error) {
        console.error('Erro ao buscar favoritos:', error.message);
        res.status(500).json({ message: 'Erro ao buscar favoritos.' });
    }
});

module.exports = router;
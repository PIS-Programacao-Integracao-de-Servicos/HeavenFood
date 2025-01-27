const favoriteService = require('../services/favoriteService');

const addFavorite = async (req, res) => {
    const { utilizador_id, receita_id } = req.body;

    if (!utilizador_id || !receita_id) {
        return res.status(400).json({ message: 'ID do utilizador e ID da receita são necessários.' });
    }

    try {
        await favoriteService.addFavorite(utilizador_id, receita_id);
        res.status(200).json({ message: 'Receita adicionada aos favoritos com sucesso.' });
    } catch (error) {
        console.error('Erro ao adicionar receita aos favoritos:', error.message);
        res.status(500).json({ message: error.message });
    }
};

const removeFavorite = async (req, res) => {
    const { utilizador_id, receita_id } = req.body;

    if (!utilizador_id || !receita_id) {
        return res.status(400).json({ message: 'ID do utilizador e ID da receita são necessários.' });
    }

    try {
        await favoriteService.removeFavorite(utilizador_id, receita_id);
        res.status(200).json({ message: 'Receita removida dos favoritos com sucesso.' });
    } catch (error) {
        console.error('Erro ao remover receita dos favoritos:', error.message);
        res.status(500).json({ message: 'Erro ao remover receita dos favoritos.' });
    }
};

const getFavoritesByUserId = async (req, res) => {
    const utilizador_id = req.params.utilizador_id;

    if (!utilizador_id) {
        return res.status(400).json({ message: 'ID do utilizador é necessário.' });
    }

    try {
        const results = await favoriteService.getFavoritesByUserId(utilizador_id);
        res.status(200).json(results);
    } catch (error) {
        console.error('Erro ao buscar favoritos:', error.message);
        res.status(500).json({ message: 'Erro ao buscar favoritos.' });
    }
};

module.exports = {
    addFavorite,
    removeFavorite,
    getFavoritesByUserId,
};
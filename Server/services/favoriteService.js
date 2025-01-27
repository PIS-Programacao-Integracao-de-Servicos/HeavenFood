const favoriteModel = require('../models/favoriteModel');

const addFavorite = async (utilizador_id, receita_id) => {
    const existingFavorite = await favoriteModel.findFavorite(utilizador_id, receita_id);

    if (existingFavorite.length > 0) {
        throw new Error('Receita já está nos favoritos.');
    }

    await favoriteModel.addFavorite(utilizador_id, receita_id);
};

const removeFavorite = async (utilizador_id, receita_id) => {
    await favoriteModel.removeFavorite(utilizador_id, receita_id);
};

const getFavoritesByUserId = async (utilizador_id) => {
    return await favoriteModel.getFavoritesByUserId(utilizador_id);
};

module.exports = {
    addFavorite,
    removeFavorite,
    getFavoritesByUserId,
};
const importRecipeService = require('../services/importRecipeService');

const importRecipes = async (req, res) => {
    try {
        await importRecipeService.importRecipes();
        res.status(200).json({ message: 'Receitas importadas com sucesso!' });
    } catch (error) {
        console.error('Erro ao importar receitas:', error.message);
        res.status(500).json({ message: 'Erro ao importar receitas.' });
    }
};

module.exports = {
    importRecipes,
};
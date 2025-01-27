const recipeService = require('../services/recipeService');
const recipeModel = require('../models/recipeModel');

const getRecipes = async (req, res) => {
    try {
        const recipes = await recipeService.getRecipes();
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Erro ao buscar receitas:', error.message);
        res.status(500).json({ message: 'Erro ao buscar receitas.' });
    }
};

const getAllRecipes = async (req, res) => {
    try {
        const recipes = await recipeService.getAllRecipes();
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Erro ao buscar todas as receitas:', error.message);
        res.status(500).json({ message: 'Erro ao buscar todas as receitas.' });
    }
};

const getRecipeByName = async (req, res) => {
    try {
        const { nome } = req.params;
        const recipes = await recipeService.getRecipeByName(nome);
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Erro ao buscar receitas pelo nome:', error.message);
        res.status(500).json({ message: 'Erro ao buscar receitas pelo nome.' });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await recipeModel.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Erro ao buscar categorias:', error.message);
        res.status(500).json({ message: 'Erro ao buscar categorias.' });
    }
}

const getRecipeByCategoryId = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await recipeModel.getRecipeByCategoryId(id);
        res.status(200).json(category);
    } catch (error) {
        console.error('Erro ao buscar categoria pelo id:', error.message);
        res.status(500).json({ message: 'Erro ao buscar categoria pelo id.' });
    }
}
module.exports = {
    getRecipes,
    getAllRecipes,
    getRecipeByName,
    getAllCategories,
    getRecipeByCategoryId
};
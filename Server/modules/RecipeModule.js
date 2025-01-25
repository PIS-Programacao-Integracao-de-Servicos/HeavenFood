// const mysql = require('mysql2');
// const db = require('../dbConnection');

// // Função para obter receitas
// const getRecipes = (req, res) => {
//   const query = 'SELECT * FROM Receita LIMIT 3'; // Por exemplo, limitar as receitas na Home Page
//   db.query(query, (err, results) => {
//     if (err) {
//       res.status(500).json({ message: 'Erro ao buscar receitas!' });
//       return;
//     }
//     res.status(200).json(results);
//   });
// };

// // Função para obter categorias de receitas
// const getRecipeCategories = (req, res) => {
//   const query = 'SELECT * FROM Categorias';
//   db.query(query, (err, results) => {
//     if (err) {
//       res.status(500).json({ message: 'Erro ao buscar categorias!' });
//       return;
//     }
//     res.status(200).json(results);
//   });
// };

// module.exports = { getRecipes, getRecipeCategories };

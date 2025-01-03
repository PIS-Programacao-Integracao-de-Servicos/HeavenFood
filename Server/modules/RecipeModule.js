const mysql = require('mysql2');

// Conexão com a base de dados MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'ReceitaDB',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conexão ao banco de dados estabelecida!');
});

// Função para obter receitas
const getRecipes = (req, res) => {
  const query = 'SELECT * FROM Receita LIMIT 10'; // Por exemplo, limitar as receitas na Home Page
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Erro ao buscar receitas!' });
      return;
    }
    res.status(200).json(results);
  });
};

// Função para obter categorias de receitas
const getRecipeCategories = (req, res) => {
  const query = 'SELECT * FROM RecipeCategories';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Erro ao buscar categorias!' });
      return;
    }
    res.status(200).json(results);
  });
};

module.exports = { getRecipes, getRecipeCategories };

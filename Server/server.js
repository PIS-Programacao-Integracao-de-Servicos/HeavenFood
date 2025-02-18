const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const importRecipeRoutes = require('./routes/importRecipeRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:8081', credentials: true }));
app.use(express.static(path.join(__dirname, '../Client')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));

app.use(session({
  secret: 'seu segredo',
  resave: false,
  saveUninitialized: true
}));

app.use('/auth', authRoutes);

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/html/profile.html'));
});

app.get('/recipes', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/html/recipes.html'));
});

app.use('/recipes/api', recipeRoutes);

app.use('/import', importRecipeRoutes);
app.use('/favorites', favoriteRoutes);

app.get('/recipes/details/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/html/recipe-details.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/html/index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/html/dashboard.html'));
});

app.get('/manageRecipes', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/html/manageRecipes.html'));
});
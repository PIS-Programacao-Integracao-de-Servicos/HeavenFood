const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const app = express();
const port = 3000;
const recipeRoutes = require('./routes/recipeRoutes');
const aboutRoutes = require('./routes/aboutRoutes');


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

app.get('/recipes', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/html/recipes.html'));
});

app.use('/recipes/api', recipeRoutes);

app.use('/api', aboutRoutes); 

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/html/index.html'));
  });

  app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/html/index.html'));
  });

  app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/html/auth.html'));
  });

app.get('/aboutus', (req, res) => {
  res.sendFile((path.join(__dirname, '../Client/html/aboutus.html')));
})
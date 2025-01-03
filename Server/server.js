const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const app = express();
const port = 3000;
const recipeRoutes = require('./routes/recipeRoutes');

// Usar as rotas de receitas


// Habilitar CORS para o cliente web
app.use(cors({ origin: 'http://localhost:8081', credentials: true }));
app.use(express.static(path.join(__dirname, '../Client')));

app.use(express.json()); // Middleware para interpretar JSON
app.use(express.urlencoded({ extended: true })); // Middleware para interpretar dados URL-encoded


// Configuração de sessão
app.use(session({
  secret: 'seu segredo',
  resave: false,
  saveUninitialized: true
}));

// Usar as rotas de autenticação
app.use('/auth', authRoutes);

app.use('/api/recipes', recipeRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Rota raiz para verificar se o servidor está rodando
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/html/index.html'));
  });

  app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/html/index.html'));
  });

  app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/html/auth.html'));
  });
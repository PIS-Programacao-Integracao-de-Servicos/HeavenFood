const express = require('express');
const session = require('express-session');


const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('Client'));

// Habilitar CORS para o cliente web
app.use(cors({ origin: 'http://localhost:8081', credentials: true }));
app.use(express.static(path.join(__dirname, '../Client')));

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração de sessão
app.use(session({
  secret: 'seu segredo',
  resave: false,
  saveUninitialized: true
}));

// Usar as rotas de autenticação
app.use('/api/auth', authRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Rota raiz para verificar se o servidor está rodando
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/html/index.html'));
  });
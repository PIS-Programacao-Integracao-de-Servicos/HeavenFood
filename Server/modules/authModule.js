const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

// Conexão com a base de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ReceitaDB'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado à base de dados!');
});

// Função para registo de novo utilizador
const signup = async (req, res) => {
  const { nome, email, senha } = req.body;

  // Verificar se o email já existe
  db.query('SELECT * FROM Utilizadores WHERE email = ?', [email], async (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      return res.status(400).json({ message: 'Email já registado!' });
    }

    // Criar um hash para a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Inserir o novo utilizador na base de dados
    db.query('INSERT INTO Utilizadores (nome, email, senha_hash) VALUES (?, ?, ?)', [nome, email, hashedPassword], (err) => {
      if (err) throw err;
      res.status(201).json({ message: 'Utilizador registado com sucesso!' });
    });
  });
};

// Função para iniciar sessão
const login = (req, res) => {
  const { email, senha } = req.body;

  // Verificar se o e-mail existe na base de dados
  db.query('SELECT * FROM Utilizadores WHERE email = ?', [email], async (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(400).json({ message: 'E-mail ou senha inválidos!' });
    }

    const user = result[0];

    // Verificar se a senha fornecida é válida
    const validPassword = await bcrypt.compare(senha, user.senha_hash);

    if (!validPassword) {
      return res.status(400).json({ message: 'E-mail ou senha inválidos!' });
    }

    // Criar a sessão para o utilizador
    req.session.userId = user.id;
    res.status(200).json({ message: 'Início de sessão bem-sucedido!' });
  });
};

module.exports = { signup, login };
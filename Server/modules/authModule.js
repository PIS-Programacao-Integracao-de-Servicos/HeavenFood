const bcrypt = require('bcryptjs');
const db = require('../dbConnection');

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado à base de dados!');
});

// Função para registo de novo utilizador
const signup = async (req, res) => {
  console.log(req.body);
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
  console.log('Método:', req.method);
  console.log('Body recebido no servidor:', req.body);
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'E-mail ou senha não fornecidos!' });
}

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

    // Sessão
    req.session.userId = user.id;
    res.status(200).json({ message: 'Login bem-sucedido!' });
  });
};

module.exports = { signup, login };
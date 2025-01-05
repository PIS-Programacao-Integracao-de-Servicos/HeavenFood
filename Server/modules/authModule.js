const bcrypt = require('bcryptjs');
const db = require('../dbConnection');

// Conexão à base de dados
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado à base de dados!');
});

// Função para registo de novo utilizador
const signup = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verificar se o email já existe
    const [result] = await db.promise().query('SELECT * FROM Utilizadores WHERE email = ?', [email]);

    if (result.length > 0) {
      return res.status(400).json({ message: 'Email já registado!' });
    }

    // Criar um hash para a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Inserir o novo utilizador na base de dados
    await db.promise().query('INSERT INTO Utilizadores (nome, email, senha_hash) VALUES (?, ?, ?)', [nome, email, hashedPassword]);

    res.status(201).json({ message: 'Utilizador registado com sucesso!' });
  } catch (err) {
    console.error('Erro ao registar utilizador:', err);
    res.status(500).json({ message: 'Erro ao processar o registo!' });
  }
};

// Função para autenticar e iniciar sessão
const login = (req, res) => {
  try {
      console.log('Método:', req.method);
      console.log('Body recebido no servidor:', req.body);

      const { email, senha } = req.body;

      if (!email || !senha) {
          return res.status(400).json({ message: 'E-mail ou senha não fornecidos!' });
      }

      db.query('SELECT * FROM Utilizadores WHERE email = ?', [email], async (err, result) => {
          if (err) {
              console.error('Erro na consulta à base de dados', err);
              return res.status(500).json({ message: 'Erro interno ao fazer login' });
          }

          if (result.length === 0) {
              return res.status(400).json({ message: 'E-mail ou senha inválidos!' });
          }

          const user = result[0];

          const validPassword = await bcrypt.compare(senha, user.senha_hash);

          if (!validPassword) {
              return res.status(400).json({ message: 'E-mail ou senha inválidos!' });
          }

          req.session.user = { id: user.id, nome: user.nome };
          return res.status(200).json({ message: 'Login bem-sucedido!', user: req.session.user });
      });
  } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ message: 'Erro interno ao fazer login' });
  }
};

module.exports = { signup, login };

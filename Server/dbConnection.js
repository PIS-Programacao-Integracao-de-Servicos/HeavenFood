const mysql = require('mysql2');

// Conexão com a base de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'receitadb'
});

module.exports = db;
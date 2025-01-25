const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'receitadb'
});


db.connect((err) => {
  if (err) throw err;
  console.log('Conectado à base de dados!');
});

module.exports = db;
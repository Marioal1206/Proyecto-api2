const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // ej: 'root'
  password: 'Mario135$',
  database: 'DesarrolloAPI'
});

conexion.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = conexion;

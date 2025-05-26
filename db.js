const mysql = require('mysql2');

const conexion = mysql.createPool({
 uri: 'mysql://root:PqpGoeLMWFMiNwFSpyShDoPqcuEhaJAD@shortline.proxy.rlwy.net:26989/railway',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



module.exports = conexion;

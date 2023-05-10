const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce",
    port:3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;
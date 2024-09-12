const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tu_base_de_datos',
});

// Función para registrar un usuario
async function registerUser(username, password, email) {
  const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña
  const [result] = await pool.query(
    'INSERT INTO users (username, password, email) VALUES (?, ?, ?)', 
    [username, hashedPassword, email]
  );
  return result;
}

// Función para obtener un usuario por nombre
async function getUserByUsername(username) {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE username = ?', 
    [username]
  );
  return rows[0];
}

module.exports = { registerUser, getUserByUsername };

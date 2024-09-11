// models/user.js
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
  host: 'localhost',  // Cambia si tu host es diferente
  user: 'root',
  password: '', // Cambia la contraseña
  database: 'tu_base_de_datos',  // Nombre de la base de datos
});

// Función para registrar un usuario
async function registerUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña
  const [result] = await pool.query(
    'INSERT INTO users (username, password) VALUES (?, ?)', 
    [username, hashedPassword]
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

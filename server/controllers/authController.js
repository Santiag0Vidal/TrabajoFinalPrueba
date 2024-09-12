const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Necesitarás instalar jsonwebtoken

const JWT_SECRET = 'your_secret_key'; // Debes guardar esto en un archivo .env

// Expresiones regulares para validación de email y contraseñas
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Mínimo 8 caracteres, una letra y un número

// Registro de usuario
async function register(ctx) {
  const { username, password, email } = ctx.request.body;
  
  // Validaciones
  if (!emailRegex.test(email)) {
    ctx.status = 400;
    ctx.body = { message: 'El formato del email es inválido' };
    return;
  }

  if (!passwordRegex.test(password)) {
    ctx.status = 400;
    ctx.body = { message: 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra y un número' };
    return;
  }

  try {
    const existingUser = await userModel.getUserByUsername(username);
    if (existingUser) {
      ctx.status = 400;
      ctx.body = { message: 'El usuario ya existe' };
      return;
    }

    await userModel.registerUser(username, password, email);
    ctx.status = 201;
    ctx.body = { message: 'Usuario registrado exitosamente' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Error en el servidor registro', error };
  }
}

// Login de usuario
async function login(ctx) {
  const { username, password } = ctx.request.body;

  try {
    const user = await userModel.getUserByUsername(username);
    if (!user) {
      ctx.status = 400;
      ctx.body = { message: 'Usuario no encontrado' };
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      ctx.status = 400;
      ctx.body = { message: 'Contraseña incorrecta' };
      return;
    }

    // Generar token JWT
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

    // Configurar cookie de sesión
    ctx.cookies.set('token', token, { httpOnly: true, maxAge: 3600000 });

    ctx.status = 200;
    ctx.body = { message: 'Inicio de sesión exitoso' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Error en el servidor login', error };
  }
}

// Verificar autenticación
async function checkAuth(ctx) {
  const token = ctx.cookies.get('token');

  if (!token) {
    ctx.status = 401;
    ctx.body = { message: 'No autenticado' };
    return;
  }

  try {
    jwt.verify(token, JWT_SECRET);
    ctx.status = 200;
    ctx.body = { message: 'Autenticado' };
  } catch (err) {
    ctx.status = 401;
    ctx.body = { message: 'Token inválido' };
  }
}

module.exports = { register, login, checkAuth };

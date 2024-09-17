const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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


async function login(ctx) {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    ctx.status = 400;
    ctx.body = { message: 'Username and password are required' };
    return;
  }

  try {
    const user = await userModel.getUserByUsername(username);
    console.log('Retrieved user:', user); // Verifica que el usuario y la contraseña estén presentes

    if (!user) {
      ctx.status = 401;
      ctx.body = { message: 'Invalid username or password' };
      return;
    }

    console.log('Password:', password);
    console.log('User password hash:', user.password);

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      ctx.cookies.set('token', token, {
        httpOnly: true,
        maxAge: 3600000,
        sameSite: 'lax',
        path: '/',
      });
      ctx.status = 200;
      ctx.body = { message: 'Login successful' };
    } else {
      ctx.status = 401;
      ctx.body = { message: 'Invalid username or password' };
    }
  } catch (error) {
    console.error('Error en el login:', error);
    ctx.status = 500;
    ctx.body = { message: 'Internal server error' };
  }
}


// Verificación de autenticación
async function checkAuth(ctx) {
  const token = ctx.cookies.get('token');

  if (!token) {
    ctx.status = 401;
    ctx.body = { message: 'No autenticado' };
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userModel.getUserByUsername(decoded.username);

    if (user) {
      ctx.status = 200;
      ctx.body = { message: 'Autenticado', user };
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Usuario no encontrado' };
    }
  } catch (err) {
    ctx.status = 401;
    ctx.body = { message: 'Token inválido o expirado' };
  }
}

module.exports = { register, login, checkAuth };

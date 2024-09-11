const userModel = require('../models/users'); // Corrección aquí
const bcrypt = require('bcrypt');

// Registro de usuario
async function register(ctx) {
  const { username, password } = ctx.request.body;
  try {
    const existingUser = await userModel.getUserByUsername(username);
    if (existingUser) {
      ctx.status = 400;
      ctx.body = { message: 'El usuario ya existe' };
      return;
    }

    await userModel.registerUser(username, password);
    ctx.status = 201;
    ctx.body = { message: 'Usuario registrado exitosamente' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Error en el servidor', error };
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

    // Simulación de autenticación exitosa (aquí podrías agregar JWT)
    ctx.status = 200;
    ctx.body = { message: 'Inicio de sesión exitoso' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Error en el servidor', error };
  }
}

module.exports = { register, login };

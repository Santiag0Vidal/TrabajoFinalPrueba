// ProfileController.js
async function getProfile(ctx) {
    try {
      // Simulación de obtención de perfil (en un caso real, obtendría datos del usuario autenticado)
      ctx.status = 200;
      ctx.body = { message: 'Información del perfil', user: 'Usuario de ejemplo' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: 'Error en el servidor', error };
    }
  }
  
  module.exports = { getProfile };
   
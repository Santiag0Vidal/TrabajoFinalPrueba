//profile.js
const Router = require('koa-router');
const profileController = require('../controllers/profileController');
const router = new Router();

// Ruta para obtener la información del perfil (por ejemplo)
router.get('/profile', profileController.getProfile);

module.exports = router;

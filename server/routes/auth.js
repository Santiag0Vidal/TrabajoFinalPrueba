// routes/auth.js
const Router = require('koa-router');
const authController = require('../controllers/authController');
const router = new Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/check-auth', authController.checkAuth); // Usa el controlador checkAuth

module.exports = router;

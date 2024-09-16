require('dotenv').config();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const session = require('koa-session');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const app = new Koa();

// Acceder a las variables de entorno
const JWT_SECRET = process.env.JWT_SECRET;

// Configuración de la sesión
app.keys = ['some secret key']; // Debes usar una clave secreta para firmar las cookies
app.use(session(app));

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3000', // La URL de tu frontend
  credentials: true, // Permitir credenciales (cookies)
}));

// Middlewares
app.use(bodyParser());

// Rutas
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());
app.use(profileRoutes.routes()).use(profileRoutes.allowedMethods());

app.listen(4000, () => {
  console.log('Servidor corriendo en http://localhost:4000');
});

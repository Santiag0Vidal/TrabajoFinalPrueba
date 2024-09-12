// index.js
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const session = require('koa-session');
const app = new Koa();

// Configuración de la sesión
app.keys = ['some secret key']; // Debes usar una clave secreta para firmar las cookies
app.use(session(app));

// Middlewares
app.use(cors());
app.use(bodyParser());
app.use(homeRoutes.routes());

// Rutas
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());

app.listen(4000, () => {
  console.log('Servidor corriendo en http://localhost:4000');
});


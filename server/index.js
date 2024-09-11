// index.js
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const authRoutes = require('./routes/auth');

const app = new Koa();

// Middlewares
app.use(cors());
app.use(bodyParser());

// Rutas
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());

app.listen(4000, () => {
  console.log('Servidor corriendo en http://localhost:4000');
});

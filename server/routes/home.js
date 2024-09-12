const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = { message: 'Bienvenido a la página de inicio' };
});

module.exports = router;

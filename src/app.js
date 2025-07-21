import fastify from 'fastify';
import { mediaRoutes, favoritesRoutes } from './routes/routes.js';

function buildApp() {
  const app = fastify({ logger: true }); //log ativo

  app.get('/health', async () => ({ status: 'ok' })); //teste para ver se o servidor esta no ar

  app.register(mediaRoutes); //rotas de media
  app.register(favoritesRoutes); //rotas de favorites

  return app;
}

export default buildApp;

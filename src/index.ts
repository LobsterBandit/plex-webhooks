import express from 'express';
import { PlexController } from './plex/plex.controller';
import { middleware, globalErrorLogger } from './middleware';

function bootstrap() {
  console.log('Bootstrapping the app');
  const port = process.env.PORT || 5050;
  const app = express();
  app.disable('x-powered-by');

  app.use(...middleware);

  app.use('/', PlexController);

  app.use(globalErrorLogger);

  app.listen(port);
  console.log(`App listening on port ${port}`);
}

bootstrap();

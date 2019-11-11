import express from 'express';
import { PlexController } from './plex/plex.controller';
import { middleware } from './middleware';
import { appLogger, globalErrorLogger } from './logger';

function bootstrap() {
  appLogger.info('Bootstrapping the app');

  const port = process.env.PORT || 5050;
  const app = express();
  app.disable('x-powered-by');

  app.use(...middleware);

  app.use('/', PlexController);

  app.use(globalErrorLogger);

  app.listen(port, () => {
    appLogger.info(`App listening on port ${port}`);
  });
}

bootstrap();

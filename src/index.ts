import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { PlexController } from './plex/plex.controller';
import { middleware } from './middleware';
import { appLogger, globalErrorLogger } from './logger';

function bootstrap() {
  appLogger.info('Bootstrapping the app');

  const port = process.env.PORT || 5050;

  const app = express();
  const httpServer = http.createServer(app);
  const io = socketio(httpServer);

  app.disable('x-powered-by');

  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  app.use(...middleware);

  app.use('/', PlexController);

  app.use(globalErrorLogger);

  app.use('/view', express.static('public'));

  io.on('connection', function(socket) {
    appLogger.info('user connected to socket');
    socket.on('disconnect', function() {
      appLogger.info('user disconnected from socket');
    });
  });

  httpServer.listen(port, () => {
    appLogger.info(`App listening on port ${port}`);
  });
}

bootstrap();

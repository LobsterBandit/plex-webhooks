import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { Tail } from 'tail';
import { PlexController } from './plex/plex.controller';
import { middleware } from './middleware';
import { appLogger, globalErrorLogger, plexWebhookLogName } from './logger';

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

  // mod to buffer the last X nubmer of lines
  const logTail = new Tail(plexWebhookLogName);

  io.on('connection', function(socket) {
    appLogger.info('user connected to socket');

    // deliver last X number of lines on connect

    socket.on('disconnect', function() {
      appLogger.info('user disconnected from socket');
    });
  });

  logTail.on('line', data => {
    appLogger.verbose('Emitting plexWebhook event');
    io.emit('plexWebhook', data);
  });

  logTail.on('error', error => {
    appLogger.error(error);
  });

  httpServer.listen(port, () => {
    appLogger.info(`App listening on port ${port}`);
  });
}

bootstrap();

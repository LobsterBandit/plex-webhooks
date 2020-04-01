import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { Tail } from 'tail';
import { PlexController } from './plex/plex.controller';
import { middleware } from './middleware';
import { appLogger, globalErrorLogger, plexWebhookLogName } from './logger';
import fs from 'fs';

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

  fs.closeSync(fs.openSync(plexWebhookLogName, 'a'));

  const logs: string[] = [];

  io.on('connection', function (socket) {
    appLogger.info('user connected to socket');

    // deliver last X number of lines on connect
    logs.map((log) => {
      socket.emit('plexWebhook:history', log);
    });

    socket.on('disconnect', function () {
      appLogger.info('user disconnected from socket');
    });
  });

  const logTail = new Tail(plexWebhookLogName);

  logTail.on('line', (data) => {
    appLogger.verbose('Emitting plexWebhook event');
    const newLogLength = logs.push(data);
    if (newLogLength > 10) logs.shift();
    io.emit('plexWebhook', data);
  });

  logTail.on('error', (error) => {
    appLogger.error(error);
  });

  httpServer.listen(port, () => {
    appLogger.info(`App listening on port ${port}`);
  });
}

bootstrap();

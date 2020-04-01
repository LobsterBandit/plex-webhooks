import expressWinston from 'express-winston';
import winston from 'winston';

export const appLogger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console()],
  format: winston.format.combine(winston.format.cli()),
});

export const globalRequestLogger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.cli(),
  meta: false,
  expressFormat: true,
  colorize: true,
});

export const globalErrorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.Console()],
});

export const plexWebhookLogName = 'plex_webhooks.log';

export const plexWehbookLogger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: plexWebhookLogName,
      maxsize: 1024 * 1024 * 5,
      maxFiles: 20,
      tailable: true,
    }),
  ],
  format: winston.format.json(),
});

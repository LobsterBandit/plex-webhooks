import express, { RequestHandler } from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';
import multer from 'multer';

/**
 * Handler for plex endpoint
 */
const plexGetHandler: RequestHandler = async (req, res) => {
  const response = 'plex webhooks';
  return res.json(response);
};

/**
 * Handler for plex webhooks
 */
const plexWebhookHandler: RequestHandler = async (req, res) => {
  console.log(req.body);
  return res.sendStatus(202);
};

const plexWebhookLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'plex_webhooks.log',
      maxFiles: 10,
      maxsize: 1024 * 1024 * 5,
      tailable: true,
    }),
  ],
  format: winston.format.combine(winston.format.json()),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: '{{req.body.payload}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
});

const upload = multer();

const PlexController = express.Router();

PlexController.get('/', plexGetHandler);

PlexController.post(
  '/',
  upload.single('thumb'),
  plexWebhookLogger,
  plexWebhookHandler,
);

export { PlexController };

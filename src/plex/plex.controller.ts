import express, { RequestHandler } from 'express';
import multer from 'multer';
import { appLogger, plexWehbookLogger } from '../logger';

/**
 * Handler for plex endpoint
 */
const plexGetHandler: RequestHandler = async (req, res) => {
  appLogger.info('empty get handler');
  return res.sendStatus(200);
};

/**
 * Handler for plex webhooks
 */
const plexWebhookHandler: RequestHandler = async (req, res) => {
  const message = {
    payload: JSON.parse(req.body.payload),
    thumb: req.file?.buffer.toString('base64'),
  };
  appLogger.verbose(message);
  plexWehbookLogger.info(message);
  req.io.emit('plexWebhook', JSON.stringify(message));
  return res.sendStatus(202);
};

const upload = multer();

const PlexController = express.Router();

PlexController.get('/', plexGetHandler);

PlexController.post('/', upload.single('thumb'), plexWebhookHandler);

export { PlexController };

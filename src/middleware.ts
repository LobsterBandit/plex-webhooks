import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ErrorRequestHandler } from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';

export const globalRequestLogger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
});

export const globalErrorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
});

/**
 * Catches malformed JSON body errors
 * - success: calls next()
 * @returns 400 JSON response { error: malformed data }
 */
export const handleMalformedJSON: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  if (error instanceof SyntaxError) {
    return res.status(400).json({ error: 'malformed data' });
  }

  next();
};

/**
 * CORS configuration
 */
const corsOptions = {
  origin: [
    // TODO: hosted client domain
    'http://localhost:3000', // default local client domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export const middleware = [
  globalRequestLogger,
  cors(corsOptions),
  cookieParser(process.env.COOKIE_SECRET),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  handleMalformedJSON,
];

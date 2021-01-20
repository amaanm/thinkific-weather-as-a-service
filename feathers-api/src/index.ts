import logger from './logger';
import app from './app';
import express from '@feathersjs/express';

const hostname = app.get('host');
const port = app.get('port');
const root = express();
root.use('/v1', app);

const server = root.listen(port, hostname);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', hostname, port)
);

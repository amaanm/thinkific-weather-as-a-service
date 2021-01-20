import express from '@feathersjs/express';
import path from 'path';
import favicon from 'serve-favicon';

import logger from './logger';
import app from './app';

const hostname = app.get('host');
const port = app.get('port');
const root = express();
root.use('/v1', app);

// Host the public folder
root.use(favicon(path.join(app.get('public'), 'favicon.ico')));
root.use('/', express.static(app.get('public')));

const server = root.listen(port, hostname);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', hostname, port)
);

import app from './app';

const port = app.get('PORT');
const server = app.listen(port);

// Handle any uncaught promise rejections in the app
process.on('unhandledRejection', (reason, p) =>
  console.error('Unhandled Rejection at: Promise ', p, reason)
);

// log application startup
server.on('listening', () => {
  console.info('API (v%s) started on port %d', process.env.npm_package_version, port);
});

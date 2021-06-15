import express from 'express';
import { initialize } from 'express-openapi';
import { resolve } from 'path';
import { jwtAuth } from './functions/security';
import { docs } from './api-doc';
import cors from 'cors';

export const app = express();

app.use(cors());

initialize({
  apiDoc: docs,
  app: app,
  paths: resolve(__dirname, 'routes'),
  securityHandlers: {
    jwtAuth: jwtAuth,
  },
});

app.get('/v1/test', (_req, res, next) => {
  res.status(200).end();
});

app.use((req, res, next) => {
  console.warn('Invalid URL', req.originalUrl);
  res.status(404).json({ error: 'Not found' });
});

app.use(((err, _req, res, next) => {
  let message;

  if (typeof err.message === 'string') {
    message = { error: 'Server error' };
  } else if (err.status == 400) {
    const { errors } = err;
    message = { errors: errors };
  } else {
    message = err.message;
  }

  res.status(err.status).json(message);
}) as express.ErrorRequestHandler);

const port = parseInt(process.argv[2], 10);

if (!isNaN(port)) {
  app.listen(port, () => {
    console.log('Server is running at http://localhost:%d', port);
  });
}

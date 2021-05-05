import express from 'express';
import { initialize } from 'express-openapi';
import { resolve } from 'path';
import { jwtAuth } from './functions/security';
import { docs } from './api-doc';
import cors from 'cors';

const app = express();

app.use(cors());

initialize({
  apiDoc: docs,
  app: app,
  paths: resolve(__dirname, 'routes'),
  securityHandlers: {
    jwtAuth: jwtAuth,
  },
});

app.use((_req, res, next) => {
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

app.listen(3000);

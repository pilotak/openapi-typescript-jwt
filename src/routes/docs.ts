import { Operation } from 'express-openapi';
import { Response } from 'express';
import { OpenAPIV3 } from 'openapi-types';
import { RequestExtended } from '../functions/utils';

export const GET: Operation = [
  (req: RequestExtended, res: Response): Response<OpenAPIV3.Document> => {
    if (req.auth) {
      console.log('username:', req.auth.username);
    }
    return res.json(req.apiDoc);
  },
];

GET.apiDoc = {
  description: 'Get OpenAPI definition',
  operationId: 'getDocs',
  security: [], // no auth needed
  responses: {
    200: {
      description: 'OpenAPI definition',
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
        },
      },
    },
  },
};

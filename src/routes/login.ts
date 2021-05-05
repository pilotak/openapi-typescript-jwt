import { Operation } from 'express-openapi';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { RequestExtended } from '../functions/utils';

export const POST: Operation = [
  (req: RequestExtended, res: Response): Response => {
    const { username } = req.query;

    const token = sign({ username: username }, 'secret');
    return res.json({ token });
  },
];

POST.apiDoc = {
  description: 'Perform login',
  operationId: 'login',
  security: [], // no auth needed
  parameters: [
    {
      in: 'query',
      name: 'username',
      schema: {
        type: 'string',
      },
      description: 'Username',
      required: true,
    },
  ],
  responses: {
    200: {
      description: 'Successfully logged in',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
              },
            },
            example: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ...',
            },
          },
        },
      },
    },
    400: {
      $ref: '#/components/responses/ValidationError',
    },
    default: {
      $ref: '#/components/responses/Error',
    },
  },
};

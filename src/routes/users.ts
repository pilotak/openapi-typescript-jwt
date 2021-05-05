import { Operation } from 'express-openapi';
import { Response } from 'express';
import { RequestExtended } from '../functions/utils';

export const GET: Operation = [
  (req: RequestExtended, res: Response): void => {
    res.status(200).json({ name: 'fred' });
  },
];

GET.apiDoc = {
  description: 'Get user',
  operationId: 'getUser',
  tags: ['users'],
  responses: {
    200: {
      description: 'User info',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
            required: ['name'],
          },
        },
      },
    },
    default: {
      $ref: '#/components/responses/Error',
    },
  },
};

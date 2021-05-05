import { OpenAPIV3 } from 'openapi-types';

export const docs: OpenAPIV3.Document = {
  openapi: '3.0.3',
  servers: [
    {
      url: 'http://localhost/v1',
      description: 'Test server',
    },
  ],
  info: {
    title: 'Sample API',
    description: 'Test.',
    version: '1.0.0',
  },
  paths: {},
  components: {
    responses: {
      Error: {
        description: 'Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
      ValidationError: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                errors: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/ValidationErrorObject',
                  },
                },
              },
              required: ['errors'],
            },
          },
        },
      },
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
          },
        },
        required: ['error'],
      },
      ValidationErrorObject: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
          },
          errorCode: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
          location: {
            type: 'string',
          },
        },
        required: ['path', 'errorCode', 'message', 'location'],
      },
    },
    securitySchemes: {
      jwtAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  // Apply the security globally
  security: [
    {
      jwtAuth: [],
    },
  ],
};

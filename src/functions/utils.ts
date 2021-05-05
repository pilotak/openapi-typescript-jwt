import { Request } from 'express';
import { OpenAPIV3 } from 'openapi-types';
import { UserJWT } from './security';

export interface RequestExtended extends Request {
  auth?: UserJWT;
  apiDoc?: OpenAPIV3.Document;
}

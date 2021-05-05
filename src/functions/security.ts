import { OpenAPI } from 'openapi-types';
import jwt from 'jsonwebtoken';

export interface UserJWT {
  username: string;
  iat?: string;
  exp?: string;
}

interface OpenAPIReqExtended extends OpenAPI.Request {
  auth?: UserJWT;
}

interface CustomHeaders extends Object {
  authorization?: string;
}

export const jwtAuth = (req: OpenAPIReqExtended): boolean => {
  let { authorization } = req.headers as CustomHeaders;

  if (!authorization) {
    throw {
      status: 401,
      message: { error: 'Bearer token missing' },
    };
  }

  try {
    authorization = authorization.replace('Bearer ', '');
    req.auth = jwt.verify(authorization, 'secret') as UserJWT; // process.env.JWT_SECRET

    return true;
  } catch {
    throw {
      status: 401,
      message: { error: 'Unauhorized' },
    };
  }
};

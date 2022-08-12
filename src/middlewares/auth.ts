import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AuthError from '../utils/errors/auth-error';

interface SessionRequest extends Request {
  user?: string | JwtPayload
}
export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new AuthError('Требуется авторизация'));
  }

  const token = authorization.replace('Bearer', '');

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new AuthError('Требуется авторизация'));
  }

  req.user = payload;

  next();
};

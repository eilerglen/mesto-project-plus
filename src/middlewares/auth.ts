import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AuthError from '../utils/errors/auth-error';

interface SessionRequest extends Request {
  user?: string | JwtPayload
}
export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new AuthError('Требуется авторизация'))
  }

  const token = authorization.replace('Bearer', '');
  const { JWT_SECRET } = process.env;

  let payload;

  try {
    payload = jwt.verify(token, `${JWT_SECRET}`);
  } catch (err) {
    return next(new AuthError('Требуется авторизация'));
  }

  req.user = payload;

}
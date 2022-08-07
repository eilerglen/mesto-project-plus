import { NOT_FOUND_ERROR } from './constants';

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR;
  }
}

export default NotFoundError;

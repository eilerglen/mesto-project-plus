import { VALIDATION_ERROR } from './constants';

class ValidationRequestError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = VALIDATION_ERROR;
  }
}

export default ValidationRequestError;

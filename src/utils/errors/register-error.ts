import { REGISTER_ERROR} from './constants';

class RegisterError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = REGISTER_ERROR;
  }
}

export default RegisterError;


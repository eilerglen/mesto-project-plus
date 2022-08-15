import * as dotenv from 'dotenv';
import express, { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import { celebrate, errors } from 'celebrate';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import auth from './middlewares/auth';
import { login, createUser } from './controllers/users';
import { DEFAULT_ERROR } from './utils/errors/constants';
import { requestLogger, errorLogger } from './middlewares/logger';
import { signupJoiObj, signinJoiObj } from './utils/utils';

interface Error {
  statusCode: number,
  message: string,
}

dotenv.config();
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(requestLogger);
app.post('/signup', celebrate({ body: signupJoiObj }), createUser);
app.post('/signin', celebrate({ body: signinJoiObj }), login);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorLogger);
app.use(errors());

app.use((
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  const { statusCode = DEFAULT_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === DEFAULT_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

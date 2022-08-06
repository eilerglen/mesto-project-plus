import express, { NextFunction } from 'express';
import mongoose  from 'mongoose';
import userRouter from '../src/routes/users'
import cardRouter from '../src/routes/cards'
import { Request, Response } from 'express';
import TempRequest from '../utils'

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use('/', userRouter);

app.use((req: TempRequest, res: Response, next:NextFunction) => {
  req.user = {
    _id: '62eec612b321bf743bc52aca' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  console.log(req.user._id)
  next();
});

app.use('/cards', cardRouter);



app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
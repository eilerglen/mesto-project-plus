import mongoose from 'mongoose';
import validator from 'validator';
import isEmail from 'validator/lib/isEmail';

interface IUser {
  name: string,
  about: string,
  avatar: string,
  email: string,
  password: string,
}

const userShema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
    validate: validator.isURL,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: any) => isEmail(v),
      message: 'Некорректный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
});

export default mongoose.model<IUser>('user', userShema);

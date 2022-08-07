import mongoose from 'mongoose';
import validator from 'validator';

interface IUser {
  name: string,
  about: string,
  avatar: string
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
});

export default mongoose.model<IUser>('user', userShema);

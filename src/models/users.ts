import mongoose from 'mongoose';

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
    validate: {
      // eslint-disable-next-line no-useless-escape
      validator: () => /https*:\/\/w*[A-Za-z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]{5,}\#*/,
      message: 'Необходимо передать ссылку',
    },
  },
});

export default mongoose.model<IUser>('user', userShema);

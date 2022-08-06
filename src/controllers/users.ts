/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';

import User from '../models/users';
import TempRequest from '../utils/utils';

// Получаем всех юзеров
// eslint-disable-next-line consistent-return
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.send({ data: users });
  } catch (err) {
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

// Получаем конкретного юзера

// eslint-disable-next-line consistent-return
export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id);
    return res.send(user);
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    }
  }
};

// Создаем юзера

// eslint-disable-next-line consistent-return
export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.send({ data: user });
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    }
  }
};

// Обновляем данные юзера

// eslint-disable-next-line consistent-return
export const updateUser = async (req: TempRequest, res: Response) => {
  const id = req.user?._id;
  const { name, about } = req.body;
  try {
    const updateUserProfile = await User.findByIdAndUpdate(id, { name, about });
    return res.send(updateUserProfile);
  } catch (err) {
    if (err instanceof Error) {
      switch (err.name) {
        case 'ValidationError':
          res.status(400).send({ message: 'Переданы некорректные данные' });
        // eslint-disable-next-line no-fallthrough
        case 'CastError':
          res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
        // eslint-disable-next-line no-fallthrough
        default: res.status(500).send({ message: 'Произошла ошибка' });
      }
    }
  }
};

// Обновляем аватар

// eslint-disable-next-line consistent-return
export const updateAvatar = async (req: TempRequest, res: Response) => {
  const id = req.user?._id;
  const { avatar } = req.body;
  try {
    const userUpdateAvatar = await User.findByIdAndUpdate(id, { avatar });
    return res.send(userUpdateAvatar);
  } catch (err) {
    if (err instanceof Error) {
      switch (err.name) {
        case 'ValidationError':
          res.status(400).send({ message: 'Переданы некорректные данные' });
        // eslint-disable-next-line no-fallthrough
        case 'CastError':
          res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
        // eslint-disable-next-line no-fallthrough
        default: res.status(500).send({ message: 'Произошла ошибка' });
      }
    }
  }
};

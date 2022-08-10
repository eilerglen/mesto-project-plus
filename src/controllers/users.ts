/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import ValidationRequestError from '../utils/errors/validation-error';
import NotFoundError from '../utils/errors/not-found-error';
import User from '../models/users';
import TempRequest from '../utils/utils';

// Получаем всех юзеров

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    next(err);
  }
};

// Получаем конкретного юзера

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id);
    if (!user) {
      next(new NotFoundError('Пользователь не найден'));
      return;
    }
    res.send({ data: user });
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь не найден'));
        return;
      }
      next(err);
    }
  }
};

// Создаем юзера

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });
    res.send({ data: user });
  } catch (err) {
    if (err instanceof Error) {
      switch (err.name) {
        case 'ValidationError':
          next(new ValidationRequestError('Переданы некорректные данные'));
          break;
        case 'CastError':
          next(new NotFoundError('Пользователь не найден'));
          break;
        default: next(err);
      }
    }
  }
};

// Обновляем данные юзера

export const updateUser = async (req: TempRequest, res: Response, next: NextFunction) => {
  const id = req.user?._id;
  const { name, about } = req.body;
  try {
    const userUpdate = await User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true });
    if (!userUpdate) {
      next(new NotFoundError('Пользователь не найден'));
      return;
    }
    res.send(userUpdate);
  } catch (err) {
    if (err instanceof Error) {
      switch (err.name) {
        case 'ValidationError':
          next(new ValidationRequestError('Переданы некорректные данные'));
          break;
        case 'CastError':
          next(new NotFoundError('Пользователь не найден'));
          break;
        default: next(err);
      }
    }
  }
};

// Обновляем аватар

export const updateAvatar = async (req: TempRequest, res: Response, next: NextFunction) => {
  const id = req.user?._id;
  const { avatar } = req.body;
  try {
    const userUpdateAvatar = await User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true });
    if (!userUpdateAvatar) {
      next(new NotFoundError('Пользователь не найден'));
      return;
    }
    res.send(userUpdateAvatar);
  } catch (err) {
    if (err instanceof Error) {
      switch (err.name) {
        case 'ValidationError':
          next(new ValidationRequestError('Переданы некорректные данные'));
          break;
        case 'CastError':
          next(new NotFoundError('Пользователь не найден'));
          break;
        default: next(err);
      }
    }
  }
};

// Логируемся

// eslint-disable-next-line consistent-return
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
    return res.cookie('token', token, { httpOnly: true }).end();
  } catch (err) {
    next(err);
  }
};

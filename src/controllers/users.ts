import { Request, Response } from 'express';
import User from '../models/users'
import TempRequest from '../../utils'

// Получаем всех юзеров
export const getUsers = async(req: Request, res: Response) => {
  try {
      const users = await User.find({})
      return res.send({data: users})
  }

  catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
}

// Получаем конкретного юзера

export const getUserById = async(req: Request, res: Response) => {
  const id = req.params.userId
  try {
      const user = await User.findById(id)
      return res.send(user)
  }

  catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
}

// Создаем юзера

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar} = req.body;
  try {
    const user = await User.create({ name, about, avatar});
    res.send({ data: user });
  }

  catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }

};

// Обновляем данные юзера

export const updateUser = async (req: TempRequest, res: Response) => {
  const id = req.user?._id
  const { name, about } = req.body;
  try {
    console.log(id); // _id станет доступен
    const updateUserProfile = await User.findByIdAndUpdate(id, { name, about })
    return res.send(updateUserProfile);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });

  }
};

// Обновляем аватар

export const updateAvatar = async (req: TempRequest, res: Response) => {
  const id = req.user?._id
  const { avatar } = req.body;
  try {
    const userUpdateAvatar = await User.findByIdAndUpdate(id, { avatar })
    return res.send(userUpdateAvatar);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};


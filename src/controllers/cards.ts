import { NextFunction, Request, Response } from 'express';
import ForbiddenError from '../utils/errors/forbidden-error';
import ValidationRequestError from '../utils/errors/validation-error';
import NotFoundError from '../utils/errors/not-found-error';
import Card from '../models/cards';
import TempRequest from '../utils/utils';

// Создаем карточки

export const createCard = async (req: TempRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user?._id;
  try {
    const card = await Card.create({ name, link, owner });
    res.send({ data: card });
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === 'ValidationError') {
        next(new ValidationRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    }
  }
};

// Создаем карточкe для юзера
export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});
    res.send({ data: cards });
  } catch (err) {
    next(err);
  }
};

// Удаляем карточки

export const deleteCard = async (req: TempRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const id = req.user?._id;
  try {
    const cardRemove = await Card.findById(cardId);
    if (!cardRemove) {
      next(new NotFoundError('Карточка по указанному id не найдена'));
      return;
    }
    if (id !== cardRemove.owner) {
      throw new ForbiddenError('Нет доступа к указанным файлам');
    }
    await Card.deleteOne({ _id: cardId });
    res.send({ data: cardRemove });
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === 'CastError') {
        next(new NotFoundError('Карточка по указанному id не найдена'));
        return;
      }
      next(err);
    }
  }
};

// Лайкаем карточки

export const likeCard = async (req: TempRequest, res: Response, next: NextFunction) => {
  const id = req.user?._id;
  try {
    const cardLike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: id } }, // добавить _id в массив, если его там нет
      { new: true, runValidators: true },
    );
    if (!cardLike) {
      next(new NotFoundError('Карточка по указанному id не найдена'));
      return;
    }
    res.send({ data: cardLike });
  } catch (err) {
    if (err instanceof Error) {
      switch (err.name) {
        case 'ValidationError':
          next(new ValidationRequestError('Переданы некорректные данные'));
          break;
        case 'CastError':
          next(new NotFoundError('Карточка по указанному id не найдена'));
          break;
        default: next(err);
      }
    }
  }
};

// Дизлайкаем карточки

export const dislikeCard = async (req: TempRequest, res: Response, next: NextFunction) => {
  const id = req.params.cardId;
  try {
    const cardDislike = await Card.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user?._id } },
      { new: true, runValidators: true },
    );
    if (!cardDislike) {
      next(new NotFoundError('Карточка по указанному id не найдена'));
      return;
    }
    res.send(cardDislike);
  } catch (err) {
    if (err instanceof Error) {
      switch (err.name) {
        case 'ValidationError':
          next(new ValidationRequestError('Переданы некорректные данные'));
          break;
        case 'CastError':
          next(new NotFoundError('Карточка по указанному id не найдена'));
          break;
        default: next(err);
      }
    }
  }
};

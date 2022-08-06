import { Request, Response } from 'express';
// eslint-disable-next-line import/no-unresolved
import Card from '../models/cards';
import TempRequest from '../utils/utils';

// Создаем карточки

// eslint-disable-next-line consistent-return
export const createCard = async (req: TempRequest, res: Response) => {
  const { name, link, owner } = req.body;
  try {
    const card = await Card.create({ name, link, owner });
    return res.send({ data: card });
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    }
  }
};

// Создаем карточкe для юзера

// eslint-disable-next-line consistent-return
export const getCard = async (req: Request, res: Response) => {
  try {
    const card = await Card.find({}).populate('owner');
    return res.send({ data: card });
  } catch (err) {
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

// Получаем карточки

// eslint-disable-next-line consistent-return
export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    return res.send({ data: cards });
  } catch (err) {
    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

// Удаляем карточки

// eslint-disable-next-line consistent-return
export const deleteCard = async (req: TempRequest, res: Response) => {
  const { cardId } = req.params;
  try {
    // eslint-disable-next-line no-shadow
    const deleteCard = await Card.findByIdAndRemove(cardId);
    return res.send({ data: deleteCard });
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    }
  }
};

// Лайкаем карточки

// eslint-disable-next-line consistent-return
export const likeCard = async (req: TempRequest, res: Response) => {
  const id = req.user?._id;
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    return res.send({ data: card });
  } catch (err) {
    if (err instanceof Error) {
      switch (err.name) {
        case 'ValidationError':
          res.status(400).send({ message: 'Переданы некорректные данные' });
        // eslint-disable-next-line no-fallthrough
        case 'CastError':
          res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
        // eslint-disable-next-line no-fallthrough
        default: res.status(500).send({ message: 'Произошла ошибка' });
      }
    }
  }
};

export const dislikeCard = async (req: TempRequest, res: Response) => {
  const id = req.params.cardId;
  let card;

  try {
    card = await Card.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user?._id } },
      { new: true },
    );

    res.send(card);
  } catch (err) {
    if (err instanceof Error) {
      switch (err.name) {
        case 'ValidationError':
          res.status(400).send({ message: 'Переданы некорректные данные' });
        // eslint-disable-next-line no-fallthrough
        case 'CastError':
          res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
        // eslint-disable-next-line no-fallthrough
        default: res.status(500).send({ message: 'Произошла ошибка' });
      }
    }
  }
};
// Дизлайкаем карточки

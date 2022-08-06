import { Request, Response } from 'express';
import Card from '../models/cards'
import TempRequest from '../../utils'


// Создаем карточки

export const createCard = async (req: TempRequest, res: Response) => {
  const {name, link, owner } = req.body
  try {
   const card = await Card.create({name, link, owner})
   return res.send({data: card})
  }
  catch (error) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }

}

// Создаем карточкe для юзера

export const getCard = async(req: Request, res: Response) => {
  try {
    const card= await Card.find({}).populate('owner')
    return res.send({data: card})
   }
   catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
}

// Получаем карточки

export const getCards = async(req: Request, res: Response) => {
   try {
    const cards = await Card.find({})
    return res.send({data: cards});
   }
   catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }

}



// Удаляем карточки

export const deleteCard = async (req:TempRequest, res: Response) => {
  const {cardId} = req.params
  try {
   const deleteCard = await Card.findByIdAndRemove(cardId)
   return res.send({data: deleteCard});
  }
  catch (err) {
   res.status(500).send({ message: 'Произошла ошибка' });
 }

}

// Лайкаем карточки

export const likeCard = async (req: TempRequest, res: Response) => {
  const id = req.user?._id
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
    return res.send({data: card})
  }

  catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
}


export const dislikeCard = async (req: TempRequest, res: Response) => {
  const id = req.params.cardId;
  let card;

  try {
    card = await Card.findByIdAndUpdate(id,
      { $pull: { likes: req.user?._id } }, { new: true });

    res.send(card);
  } catch (e) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
}
// Дизлайкаем карточки


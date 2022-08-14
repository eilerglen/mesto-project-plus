import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createCardJoiObj, findCardJoiObj } from '../utils/utils';

import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const router = Router();

router.get('/', getCards);
router.post('/', celebrate({ body: createCardJoiObj }), createCard);
router.delete('/:cardId', celebrate({ params: findCardJoiObj }), deleteCard);
router.put('/:cardId/likes', celebrate({ params: findCardJoiObj }), likeCard);
router.delete('/:cardId/likes', celebrate({ params: findCardJoiObj }), dislikeCard);

export default router;

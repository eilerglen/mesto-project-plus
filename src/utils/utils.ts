import { Request } from 'express';
import { Joi } from 'celebrate';
import { ObjectId } from 'mongoose';

interface TempRequest extends Request {
  user?: { _id: ObjectId };
}

export default TempRequest;

// Валидация юзера
const signupJoiObj = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string(),

});

const signinJoiObj = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
});

const findUserJoiObj = Joi.object().keys({
  userId: Joi.string().length(24).hex(),
});

const updateUserJoiObj = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  about: Joi.string().required().min(2).max(30),
});

const updateAvatarJoiObj = Joi.object().keys({
  avatar: Joi.string().required().pattern(/https?:\/\/(www\.)?[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]+/),
});
// Валидация карточек

const createCardJoiObj = Joi.object().keys({
  name: Joi.string().min(2).max(30),
  link: Joi.string().required().pattern(/https?:\/\/(www\.)?[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]+/),
});

const findCardJoiObj = Joi.object().keys({
  cardId: Joi.string().length(24).hex(),
});

export {
  signupJoiObj,
  signinJoiObj,
  findUserJoiObj,
  updateUserJoiObj,
  updateAvatarJoiObj,
  createCardJoiObj,
  findCardJoiObj,
};

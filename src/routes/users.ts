import { Router } from 'express';
import { celebrate } from 'celebrate';
import { findUserJoiObj, updateUserJoiObj, updateAvatarJoiObj } from '../utils/utils';
import {
  getUsers,
  getUserById,
  getUserInfo,
  updateUser,
  updateAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', celebrate({ params: findUserJoiObj }), getUserById);
router.patch('/me', celebrate({ body: updateUserJoiObj }), updateUser);
router.patch('/me/avatar', celebrate({ body: updateAvatarJoiObj }), updateAvatar);

export default router;

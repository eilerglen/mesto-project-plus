
import { Router, Request, Response } from 'express';
import { getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar
} from '../controllers/users';

const router = Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:userId', getUserById);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);


export default router;
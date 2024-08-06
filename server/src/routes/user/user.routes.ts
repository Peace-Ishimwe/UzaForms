import { Router } from 'express';
import { getUsers, getUserById, updateUser } from '../../controllers/user/user.controller';

const userRoutes = Router();

userRoutes.get('/users', getUsers);
userRoutes.get('/users/:id', getUserById);
userRoutes.put('/users/:id', updateUser);

export default userRoutes;
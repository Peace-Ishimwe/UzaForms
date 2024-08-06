import { Router } from 'express';
import { createUserAndRole, getAllUserAndRole, updateUserAndRole } from '../controllers/user.role.controller';

const userAndRoleRoutes = Router();

userAndRoleRoutes.post('/user-and-roles', createUserAndRole);
userAndRoleRoutes.get('/user-and-roles', getAllUserAndRole);
userAndRoleRoutes.put('/user-and-roles/:id', updateUserAndRole);

export default userAndRoleRoutes;
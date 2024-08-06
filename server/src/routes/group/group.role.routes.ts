import { Router } from 'express';
import { createGroupAndRole, getGroupAndRoleById, getGroupAndRoles, updateGroupAndRole } from '../../controllers/group/group.role.controller';

const groupAndRoleRoutes = Router();

groupAndRoleRoutes.post('/group-and-roles', createGroupAndRole);
groupAndRoleRoutes.get('/group-and-roles', getGroupAndRoles);
groupAndRoleRoutes.get('/group-and-roles/:id', getGroupAndRoleById);
groupAndRoleRoutes.put('/group-and-roles/:id', updateGroupAndRole);

export default groupAndRoleRoutes;
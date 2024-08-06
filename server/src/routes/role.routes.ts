import { Router } from 'express';
import { createRole, getRoleById, getRoles, updateRole } from '../controllers/role.controller';

const role_routes = Router();

role_routes.post('/roles', createRole);
role_routes.get('/roles', getRoles);
role_routes.get('/roles/:id', getRoleById);
role_routes.put('/roles/:id', updateRole);

export default role_routes;
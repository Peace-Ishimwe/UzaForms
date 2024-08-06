import { Router } from 'express';
import { createFormAndRole, getFormAndRoleById, getFormAndRoles, updateFormAndRole } from '../../controllers/form/role.form.controller';

const formAndRoleRoutes = Router();

formAndRoleRoutes.post('/form-and-roles', createFormAndRole);
formAndRoleRoutes.get('/form-and-roles', getFormAndRoles);
formAndRoleRoutes.get('/form-and-roles/:id', getFormAndRoleById);
formAndRoleRoutes.put('/form-and-roles/:id', updateFormAndRole);

export default formAndRoleRoutes;
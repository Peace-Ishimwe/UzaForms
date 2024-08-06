import { Router } from 'express';
import { createFormName, getAllFormNames, getFormNameById, updateFormName } from '../../controllers/form/form.name.controller';

const formNameRoutes = Router();

formNameRoutes.post('/form-name', createFormName);
formNameRoutes.get('/form-name', getAllFormNames);
formNameRoutes.get('/form-name/:id', getFormNameById);
formNameRoutes.put('/form-name/:id', updateFormName);

export default formNameRoutes;
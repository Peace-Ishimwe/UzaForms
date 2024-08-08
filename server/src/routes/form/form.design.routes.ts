import express from 'express';
import { createFormDesign, getAllFormDesigns, getFormDesignById, updateFormDesign } from '../../controllers/form/form.design.controller';

const formDesignRoutes = express.Router();

formDesignRoutes.post('/form-design', createFormDesign);
formDesignRoutes.get('/form-design/:id', getFormDesignById);
formDesignRoutes.put('/form-design/:id', updateFormDesign);
formDesignRoutes.get('/form-design', getAllFormDesigns);


export default formDesignRoutes;
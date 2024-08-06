"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const form_name_controller_1 = require("../../controllers/form/form.name.controller");
const formNameRoutes = (0, express_1.Router)();
formNameRoutes.post('/form-name', form_name_controller_1.createFormName);
formNameRoutes.get('/form-name', form_name_controller_1.getAllFormNames);
formNameRoutes.get('/form-name/:id', form_name_controller_1.getFormNameById);
formNameRoutes.put('/form-name/:id', form_name_controller_1.updateFormName);
exports.default = formNameRoutes;
//# sourceMappingURL=form.name.routes.js.map
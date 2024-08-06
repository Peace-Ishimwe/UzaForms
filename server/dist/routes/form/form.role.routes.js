"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_form_controller_1 = require("../../controllers/form/role.form.controller");
const formAndRoleRoutes = (0, express_1.Router)();
formAndRoleRoutes.post('/form-and-roles', role_form_controller_1.createFormAndRole);
formAndRoleRoutes.get('/form-and-roles', role_form_controller_1.getFormAndRoles);
formAndRoleRoutes.get('/form-and-roles/:id', role_form_controller_1.getFormAndRoleById);
formAndRoleRoutes.put('/form-and-roles/:id', role_form_controller_1.updateFormAndRole);
exports.default = formAndRoleRoutes;
//# sourceMappingURL=form.role.routes.js.map
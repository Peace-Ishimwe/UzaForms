"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_role_controller_1 = require("../../controllers/user/user.role.controller");
const userAndRoleRoutes = (0, express_1.Router)();
userAndRoleRoutes.post('/user-and-roles', user_role_controller_1.createUserAndRole);
userAndRoleRoutes.get('/user-and-roles', user_role_controller_1.getAllUserAndRole);
userAndRoleRoutes.put('/user-and-roles/:id', user_role_controller_1.updateUserAndRole);
exports.default = userAndRoleRoutes;
//# sourceMappingURL=user.role.routes.js.map
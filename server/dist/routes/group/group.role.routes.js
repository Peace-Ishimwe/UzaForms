"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const group_role_controller_1 = require("../../controllers/group/group.role.controller");
const groupAndRoleRoutes = (0, express_1.Router)();
groupAndRoleRoutes.post('/group-and-roles', group_role_controller_1.createGroupAndRole);
groupAndRoleRoutes.get('/group-and-roles', group_role_controller_1.getGroupAndRoles);
groupAndRoleRoutes.get('/group-and-roles/:id', group_role_controller_1.getGroupAndRoleById);
groupAndRoleRoutes.put('/group-and-roles/:id', group_role_controller_1.updateGroupAndRole);
exports.default = groupAndRoleRoutes;
//# sourceMappingURL=group.role.routes.js.map
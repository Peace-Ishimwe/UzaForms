"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const group_names_controller_1 = require("../../controllers/group/group.names.controller");
const groupNameRoutes = (0, express_1.Router)();
groupNameRoutes.post('/group-name', group_names_controller_1.createGroupName);
groupNameRoutes.get('/group-name', group_names_controller_1.getAllGroupNames);
groupNameRoutes.get('/group-name/:id', group_names_controller_1.getGroupNameById);
groupNameRoutes.put('/group-name/:id', group_names_controller_1.updateGroupName);
exports.default = groupNameRoutes;
//# sourceMappingURL=group.names.routes.js.map
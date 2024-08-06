"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = require("../controllers/role.controller");
const role_routes = (0, express_1.Router)();
role_routes.post('/roles', role_controller_1.createRole);
role_routes.get('/roles', role_controller_1.getRoles);
role_routes.get('/roles/:id', role_controller_1.getRoleById);
role_routes.put('/roles/:id', role_controller_1.updateRole);
exports.default = role_routes;
//# sourceMappingURL=role.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../controllers/user/user.controller");
const userRoutes = (0, express_1.Router)();
userRoutes.get('/users', user_controller_1.getUsers);
userRoutes.get('/users/:id', user_controller_1.getUserById);
userRoutes.put('/users/:id', user_controller_1.updateUser);
exports.default = userRoutes;
//# sourceMappingURL=user.routes.js.map
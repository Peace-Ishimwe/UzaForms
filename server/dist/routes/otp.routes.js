"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otp_controller_1 = require("../controllers/otp.controller");
const otpRoutes = (0, express_1.Router)();
otpRoutes.post('/send-otp', otp_controller_1.sendOTP);
exports.default = otpRoutes;
//# sourceMappingURL=otp.routes.js.map
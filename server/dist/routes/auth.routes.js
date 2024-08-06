"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authRoutes = (0, express_1.Router)();
authRoutes.post('/register', auth_controller_1.registerUser);
authRoutes.post('/login', auth_controller_1.loginUser);
authRoutes.post('/validate/email', auth_controller_1.validateEmail);
authRoutes.post('/change-password', auth_middleware_1.checkAuth, auth_controller_1.changePassword);
authRoutes.post('/password-reset', auth_controller_1.passwordReset);
authRoutes.get('/logout', auth_middleware_1.checkAuth, auth_controller_1.logout);
authRoutes.post('/refresh-token', auth_middleware_1.checkAuth, auth_controller_1.refreshToken);
authRoutes.get('/validate/token', auth_controller_1.validateToken);
authRoutes.get('/google/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});
authRoutes.get('/google/success', (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "User login successful", user: req.user });
    }
    else {
        res.status(400).json({ message: "Not Authorized" });
    }
});
authRoutes.get('/google', passport_1.default.authenticate('google', {
    scope: ['email', 'profile']
}));
authRoutes.get('/google/callback', passport_1.default.authenticate('google', { session: false }), (req, res) => {
    if (req.user && req.user.token) {
        res.cookie('token', req.user.token, { httpOnly: false, secure: process.env.NODE_ENV === 'production' });
        res.redirect(process.env.CLIENT_URL);
    }
    else {
        res.redirect(process.env.CLIENT_URL + 'auth/login');
    }
});
exports.default = authRoutes;
//# sourceMappingURL=auth.routes.js.map
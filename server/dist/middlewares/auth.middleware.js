"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
/**
 * Middleware to check user authentication using a JWT token stored in a cookie.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization || req.cookies.token || req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ authenticated: false, message: 'Authentication token not found' });
        }
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                    return res.status(401).json({ authenticated: false, message: 'Token has expired' });
                }
                else {
                    return res.status(401).json({ authenticated: false, message: 'Invalid token' });
                }
            }
            req.user = {
                userId: decodedToken.userID,
                userType: decodedToken.userType,
            };
            next();
        });
    }
    catch (error) {
        next(error);
    }
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=auth.middleware.js.map
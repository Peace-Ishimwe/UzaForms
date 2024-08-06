"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPayload = exports.verifyToken = exports.generateToken = void 0;
const jwt = require("jsonwebtoken");
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY);
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
};
exports.verifyToken = verifyToken;
// extract payload from token
const extractPayload = (token) => {
    const payload = (0, exports.verifyToken)(token);
    return payload;
};
exports.extractPayload = extractPayload;
//# sourceMappingURL=jwt.js.map
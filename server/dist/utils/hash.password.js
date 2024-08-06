"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (password) => {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        throw new Error('Password hashing failed');
    }
};
exports.default = hashPassword;
//# sourceMappingURL=hash.password.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAndRoleModel = exports.UserModel = exports.OTPModel = void 0;
const otp_model_1 = __importDefault(require("./otp.model"));
exports.OTPModel = otp_model_1.default;
const user_model_1 = __importDefault(require("./user/user.model"));
exports.UserModel = user_model_1.default;
const user_role_model_1 = __importDefault(require("./user/user.role.model"));
exports.UserAndRoleModel = user_role_model_1.default;
//# sourceMappingURL=model.js.map
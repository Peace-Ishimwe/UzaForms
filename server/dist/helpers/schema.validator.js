"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userValidationSchema = joi_1.default.object({
    firstName: joi_1.default.string().required().messages({
        'string.base': 'First name should be a type of text',
        'any.required': 'First name is required',
    }),
    lastName: joi_1.default.string().required().messages({
        'string.base': 'Last name should be a type of text',
        'any.required': 'Last name is required',
    }),
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required',
    }),
    password: joi_1.default.string().min(6).required().messages({
        'string.min': 'Password should have a minimum length of 6 characters',
        'any.required': 'Password is required',
    })
});
//# sourceMappingURL=schema.validator.js.map
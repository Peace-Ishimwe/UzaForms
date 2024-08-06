"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.refreshToken = exports.logout = exports.passwordReset = exports.changePassword = exports.loginUser = exports.validateEmail = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user/user.model"));
const hash_password_1 = __importDefault(require("../utils/hash.password"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const otp_model_1 = __importDefault(require("../models/otp.model"));
const schema_validator_1 = require("../helpers/schema.validator");
const joi_1 = require("joi");
const jwt_1 = require("../utils/jwt");
const role_model_1 = __importDefault(require("../models/role.model"));
const user_role_model_1 = __importDefault(require("../models/user/user.role.model"));
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        try {
            await schema_validator_1.userValidationSchema.validateAsync(req.body, { abortEarly: false });
        }
        catch (validationError) {
            if (validationError instanceof joi_1.ValidationError) {
                const errorMessages = validationError.details.map((detail) => detail.message).join(', ');
                return res.status(422).json({ message: `${errorMessages}` });
            }
            throw validationError;
        }
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }
        const hashedPassword = await (0, hash_password_1.default)(password);
        const newUser = new user_model_1.default({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();
        const newRole = new role_model_1.default({ roleName: 'Pending', roleDescription: 'New role' });
        await newRole.save();
        const newUserAndRole = new user_role_model_1.default({ userId: newUser._id, roleId: newRole._id });
        await newUserAndRole.save();
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id, username: newUser.email, role: newRole.roleName }, process.env.SECRET_KEY, {
            expiresIn: '72h',
            notBefore: '0',
            algorithm: 'HS256',
            audience: process.env.JWT_AUDIENCE,
            issuer: process.env.JWT_ISSUER,
        });
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Registration failed. Please try again later.' });
    }
};
exports.registerUser = registerUser;
const validateEmail = async (req, res) => {
    try {
        const { email, OTP } = req.body;
        const document = await otp_model_1.default.findOne({ email });
        const user = await user_model_1.default.findOne({ email });
        if (!document) {
            return res.status(401).json({ message: 'Invalid OTP: Email not found' });
        }
        if (document.otp === OTP) {
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            const userAndRole = await user_role_model_1.default.findOne({ userId: user._id });
            await role_model_1.default.updateOne({ _id: userAndRole?.roleId }, { roleName: 'User' });
            return res.status(200).json({ success: true, message: 'Email verified' });
        }
        else {
            console.log('Invalid OTP');
            return res.status(401).json({ message: 'Invalid OTP' });
        }
    }
    catch (error) {
        console.error('Error validating email:', error);
        return res.status(500).json({ message: 'Failed to validate email. Please try again.' });
    }
};
exports.validateEmail = validateEmail;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Authentication failed. User not found." });
        }
        const userAndRole = await user_role_model_1.default.findOne({ userId: user._id });
        const role = await role_model_1.default.findOne({ _id: userAndRole?.roleId });
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (passwordMatch) {
            const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: role?.roleName }, process.env.SECRET_KEY, {
                expiresIn: '72h',
                notBefore: '0',
                algorithm: 'HS256',
                audience: process.env.JWT_AUDIENCE,
                issuer: process.env.JWT_ISSUER,
            });
            res.cookie('token', token);
            return res.status(200).json({
                success: true,
                message: "Authentication successful",
                userId: user._id,
                token
            });
        }
        else {
            return res
                .status(401)
                .json({ message: "Authentication failed. Password is incorrect." });
        }
    }
    catch (error) {
        console.error("Error while authenticating user:", error);
        return res
            .status(500)
            .json({ message: "Authentication failed. Please try again later." });
    }
};
exports.loginUser = loginUser;
const changePassword = async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const passwordMatch = await bcrypt_1.default.compare(currentPassword, user.password);
        if (passwordMatch) {
            const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
            return res.status(200).json({ message: 'Password changed successfully.' });
        }
        else {
            return res.status(401).json({ message: 'Current password is incorrect.' });
        }
    }
    catch (error) {
        console.error('Error while changing password:', error);
        return res.status(500).json({ message: 'Password change failed. Please try again later.' });
    }
};
exports.changePassword = changePassword;
const passwordReset = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const latestOtp = await otp_model_1.default.findOne({ email }).sort({ createdAt: -1 });
        if (!latestOtp || otp !== latestOtp.otp) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        const hashedPassword = await (0, hash_password_1.default)(newPassword);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password updated successfully.",
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};
exports.passwordReset = passwordReset;
const logout = (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Logout failed. Please try again later.' });
    }
};
exports.logout = logout;
const refreshToken = async (req, res) => {
    try {
        const token = req.headers.authorization || req.cookies.token || req.headers['authorization'];
        if (!token) {
            return res.status(400).json({ message: 'Refresh token not provided' });
        }
        const decodedToken = jsonwebtoken_1.default.decode(token);
        if (!decodedToken || !decodedToken.exp) {
            return res.status(400).json({ message: 'Invalid refresh token' });
        }
        const expiryTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const expiryThreshold = 5 * 60 * 1000;
        const timeUntilExpiry = expiryTime - currentTime;
        if (timeUntilExpiry < expiryThreshold) {
            const newToken = jsonwebtoken_1.default.sign({
                userId: decodedToken.userId,
                username: decodedToken.username,
                role: decodedToken.role,
            }, process.env.SECRET_KEY, {
                expiresIn: '72h',
                algorithm: 'HS256',
                notBefore: '0',
                audience: process.env.JWT_AUDIENCE,
                issuer: process.env.JWT_ISSUER,
            });
            res.cookie('token', newToken);
            return res.status(200).json({
                message: 'Token refreshed successfully',
                newToken,
            });
        }
        else {
            return res.status(200).json({
                message: 'Token is still valid',
                refreshToken: token,
            });
        }
    }
    catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(500).json({ message: 'Token refresh failed. Please try again later.' });
    }
};
exports.refreshToken = refreshToken;
const validateToken = async (req, res) => {
    try {
        const token = req.headers.authorization || req.cookies.token || req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const payload = (0, jwt_1.extractPayload)(token);
        if (!payload) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userPayload = payload;
        const user = await user_model_1.default.findById(userPayload.userId);
        return res.status(200).json({ success: true, message: "token is valid", user });
    }
    catch (error) {
        console.error('Error validating token:', error);
        return res.status(500).json({ success: false, message: 'Validation failed..' });
    }
};
exports.validateToken = validateToken;
//# sourceMappingURL=auth.controller.js.map
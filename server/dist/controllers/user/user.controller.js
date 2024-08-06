"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const user_model_1 = __importDefault(require("../../models/user/user.model"));
const getUsers = async (req, res) => {
    try {
        const users = await user_model_1.default.find();
        return res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve users' });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const user = await user_model_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve user' });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const { googleId, firstName, lastName, email, password, status } = req.body;
        const user = await user_model_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.googleId = googleId || user.googleId;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.password = password || user.password;
        user.status = status || user.status;
        user.updatedAt = new Date();
        await user.save();
        return res.status(200).json({ success: true, message: 'User updated successfully', user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'User update failed' });
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=user.controller.js.map
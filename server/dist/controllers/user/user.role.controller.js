"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserAndRole = exports.getAllUserAndRole = exports.createUserAndRole = void 0;
const user_role_model_1 = __importDefault(require("../../models/user/user.role.model"));
const user_model_1 = __importDefault(require("../../models/user/user.model"));
const role_model_1 = __importDefault(require("../../models/role.model"));
const createUserAndRole = async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        console.log(req.body);
        // Check if the association already exists
        const existingUserAndRole = await user_role_model_1.default.findOne({ userId, roleId });
        if (existingUserAndRole) {
            return res.status(400).json({ success: false, message: 'User and Role association already exists' });
        }
        // Create new UserAndRole entry
        const userAndRole = new user_role_model_1.default({ userId, roleId });
        await userAndRole.save();
        return res.status(201).json({ success: true, message: 'User and Role created successfully', userAndRole });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Creating user and role failed' });
    }
};
exports.createUserAndRole = createUserAndRole;
const getAllUserAndRole = async (req, res) => {
    try {
        // Retrieve all UserAndRole documents
        const userAndRoles = await user_role_model_1.default.find();
        // Retrieve user and role details for each UserAndRole
        const response = await Promise.all(userAndRoles.map(async (ur) => {
            const user = await user_model_1.default.findById(ur.userId);
            const role = await role_model_1.default.findById(ur.roleId);
            if (!user || !role) {
                return null;
            }
            return {
                _id: ur._id,
                userId: ur.userId,
                roleId: ur.roleId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: role.roleName,
                createdAt: ur.createdAt,
                status: ur.status,
                updatedAt: ur.updatedAt
            };
        }));
        const filteredResponse = response.filter(item => item !== null);
        return res.status(200).json({ success: true, data: filteredResponse });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Fetching user and role failed' });
    }
};
exports.getAllUserAndRole = getAllUserAndRole;
const updateUserAndRole = async (req, res) => {
    try {
        const { userId, roleId, status } = req.body;
        const userAndRole = await user_role_model_1.default.findById(req.params.id);
        if (!userAndRole) {
            return res.status(404).json({ success: false, message: 'UserAndRole not found' });
        }
        userAndRole.updatedAt = new Date();
        userAndRole.status = status;
        await userAndRole.save();
        return res.status(200).json({ success: true, message: 'UserAndRole updated successfully', userAndRole });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'UserAndRole update failed' });
    }
};
exports.updateUserAndRole = updateUserAndRole;
//# sourceMappingURL=user.role.controller.js.map
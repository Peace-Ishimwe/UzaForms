"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRole = exports.getRoleById = exports.getRoles = exports.createRole = void 0;
const role_model_1 = __importDefault(require("../models/role.model"));
const createRole = async (req, res) => {
    try {
        const { roleName, roleDescription, status } = req.body;
        console.log(req.body);
        const role = await role_model_1.default.findOne({ roleName: roleName });
        if (role) {
            return res.status(400).json({ message: 'Role already exists' });
        }
        const newRole = new role_model_1.default({
            roleName: roleName,
            roleDescription: roleDescription,
            status: status
        });
        await newRole.save();
        return res.status(201).json({ success: true, message: 'Role created successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Role creation failed' });
    }
};
exports.createRole = createRole;
const getRoles = async (req, res) => {
    try {
        const roles = await role_model_1.default.find();
        return res.status(200).json(roles);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve roles' });
    }
};
exports.getRoles = getRoles;
const getRoleById = async (req, res) => {
    try {
        const role = await role_model_1.default.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        return res.status(200).json(role);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve role' });
    }
};
exports.getRoleById = getRoleById;
const updateRole = async (req, res) => {
    try {
        const { roleName, roleDescription, status } = req.body;
        const role = await role_model_1.default.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        role.roleName = roleName || role.roleName;
        role.roleDescription = roleDescription || role.roleDescription;
        role.status = status || role.status;
        role.updatedAt = new Date();
        await role.save();
        return res.status(200).json({ success: true, message: 'Role updated successfully', role });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Role update failed' });
    }
};
exports.updateRole = updateRole;
//# sourceMappingURL=role.controller.js.map
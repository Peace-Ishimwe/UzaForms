"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGroupAndRole = exports.getGroupAndRoleById = exports.getGroupAndRoles = exports.createGroupAndRole = void 0;
const group_role_model_1 = __importDefault(require("../../models/group/group.role.model"));
const group_names_model_1 = __importDefault(require("../../models/group/group.names.model"));
const role_model_1 = __importDefault(require("../../models/role.model"));
const createGroupAndRole = async (req, res) => {
    try {
        const { groupNameId, roleId } = req.body;
        const existingGroupAndRole = await group_role_model_1.default.findOne({ groupNameId, roleId });
        if (existingGroupAndRole) {
            return res.status(400).json({ message: 'Group and role combination already exists' });
        }
        const newGroupAndRole = new group_role_model_1.default({
            groupNameId,
            roleId
        });
        await newGroupAndRole.save();
        return res.status(201).json({ success: true, message: 'Group and role created successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Group and role creation failed' });
    }
};
exports.createGroupAndRole = createGroupAndRole;
const getGroupAndRoles = async (req, res) => {
    try {
        // Retrieve all GroupAndRole documents
        const groupAndRoles = await group_role_model_1.default.find();
        // Retrieve group and role details for each GroupAndRole
        const response = await Promise.all(groupAndRoles.map(async (gr) => {
            const group = await group_names_model_1.default.findById(gr.groupNameId);
            const role = await role_model_1.default.findById(gr.roleId);
            if (!group || !role) {
                return null;
            }
            return {
                _id: gr._id,
                groupNameId: gr.groupNameId,
                roleId: gr.roleId,
                groupName: group.groupName,
                roleName: role.roleName,
                status: gr.status,
                createdAt: gr.createdAt,
                updatedAt: gr.updatedAt
            };
        }));
        const filteredResponse = response.filter(item => item !== null);
        return res.status(200).json({ success: true, data: filteredResponse });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve group and roles' });
    }
};
exports.getGroupAndRoles = getGroupAndRoles;
const getGroupAndRoleById = async (req, res) => {
    try {
        const groupAndRole = await group_role_model_1.default.findById(req.params.id);
        if (!groupAndRole) {
            return res.status(404).json({ message: 'Group and role not found' });
        }
        return res.status(200).json(groupAndRole);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve group and role' });
    }
};
exports.getGroupAndRoleById = getGroupAndRoleById;
const updateGroupAndRole = async (req, res) => {
    try {
        const { status } = req.body;
        const groupAndRole = await group_role_model_1.default.findById(req.params.id);
        if (!groupAndRole) {
            return res.status(404).json({ message: 'Group and role not found' });
        }
        groupAndRole.status = status || groupAndRole.status;
        groupAndRole.updatedAt = new Date();
        await groupAndRole.save();
        return res.status(200).json({ success: true, message: 'Group and role updated successfully', groupAndRole });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Group and role update failed' });
    }
};
exports.updateGroupAndRole = updateGroupAndRole;
//# sourceMappingURL=group.role.controller.js.map
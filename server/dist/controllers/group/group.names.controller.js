"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGroupName = exports.getGroupNameById = exports.getAllGroupNames = exports.createGroupName = void 0;
const group_names_model_1 = __importDefault(require("../../models/group/group.names.model"));
const group_role_model_1 = __importDefault(require("../../models/group/group.role.model"));
const user_model_1 = __importDefault(require("../../models/user/user.model"));
// Create a new Group Name
const createGroupName = async (req, res) => {
    try {
        const { groupName, status, createdBy, roles } = req.body;
        // Check if the group name already exists
        const existingGroupName = await group_names_model_1.default.findOne({ groupName });
        if (existingGroupName) {
            return res.status(400).json({ success: false, message: 'Group name already exists' });
        }
        // Create new Group Name entry
        const newGroupName = new group_names_model_1.default({ groupName, status, createdBy });
        await newGroupName.save();
        // Create entries in GroupAndRoleModel for each role
        const roleEntries = roles.map((roleId) => ({
            groupNameId: newGroupName._id,
            roleId,
            status,
            createdAt: new Date(),
            updatedAt: new Date()
        }));
        await group_role_model_1.default.insertMany(roleEntries);
        return res.status(201).json({
            success: true,
            message: 'Group name and roles created successfully',
            newGroupName,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Creating group name failed' });
    }
};
exports.createGroupName = createGroupName;
const getAllGroupNames = async (req, res) => {
    try {
        // Retrieve all GroupName documents
        const groupNames = await group_names_model_1.default.find();
        // Retrieve user details for each group
        const response = await Promise.all(groupNames.map(async (group) => {
            const user = await user_model_1.default.findById(group.createdBy);
            if (!user) {
                return {
                    _id: group._id,
                    groupName: group.groupName,
                    status: group.status,
                    createdBy: null,
                    createdAt: group.createdAt,
                    updatedAt: group.updatedAt
                };
            }
            return {
                _id: group._id,
                groupName: group.groupName,
                status: group.status,
                createdBy: {
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                createdAt: group.createdAt,
                updatedAt: group.updatedAt
            };
        }));
        return res.status(200).json({ success: true, data: response });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Fetching group names failed' });
    }
};
exports.getAllGroupNames = getAllGroupNames;
// Get a single Group Name by ID
const getGroupNameById = async (req, res) => {
    try {
        const groupName = await group_names_model_1.default.findById(req.params.id);
        if (!groupName) {
            return res.status(404).json({ success: false, message: 'Group name not found' });
        }
        return res.status(200).json({ success: true, data: groupName });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Fetching group name failed' });
    }
};
exports.getGroupNameById = getGroupNameById;
// Update a Group Name
const updateGroupName = async (req, res) => {
    try {
        const { groupName, status } = req.body;
        const groupNameDoc = await group_names_model_1.default.findById(req.params.id);
        if (!groupNameDoc) {
            return res.status(404).json({ success: false, message: 'Group name not found' });
        }
        groupNameDoc.groupName = groupName ?? groupNameDoc.groupName;
        groupNameDoc.status = status ?? groupNameDoc.status;
        groupNameDoc.updatedAt = new Date();
        await groupNameDoc.save();
        return res.status(200).json({ success: true, message: 'Group name updated successfully', groupNameDoc });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Updating group name failed' });
    }
};
exports.updateGroupName = updateGroupName;
//# sourceMappingURL=group.names.controller.js.map
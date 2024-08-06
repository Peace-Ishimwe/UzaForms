import { Request, Response } from "express";
import GroupNameModel from "../../models/group/group.names.model";
import GroupAndRoleModel from "../../models/group/group.role.model";
import UserModel from "../../models/user/user.model";

// Create a new Group Name
export const createGroupName = async (req: Request, res: Response) => {
    try {
        const { groupName, status, createdBy, roles } = req.body;

        // Check if the group name already exists
        const existingGroupName = await GroupNameModel.findOne({ groupName });
        if (existingGroupName) {
            return res.status(400).json({ success: false, message: 'Group name already exists' });
        }

        // Create new Group Name entry
        const newGroupName = new GroupNameModel({ groupName, status, createdBy });
        await newGroupName.save();

        // Create entries in GroupAndRoleModel for each role
        const roleEntries = roles.map((roleId: string) => ({
            groupNameId: newGroupName._id,
            roleId,
            status,
            createdAt: new Date(),
            updatedAt: new Date()
        }));
        await GroupAndRoleModel.insertMany(roleEntries);

        return res.status(201).json({
            success: true,
            message: 'Group name and roles created successfully',
            newGroupName,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Creating group name failed' });
    }
};

export const getAllGroupNames = async (req: Request, res: Response) => {
    try {
        // Retrieve all GroupName documents
        const groupNames = await GroupNameModel.find();

        // Retrieve user details for each group
        const response = await Promise.all(groupNames.map(async (group) => {
            const user = await UserModel.findById(group.createdBy);

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
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Fetching group names failed' });
    }
};

// Get a single Group Name by ID
export const getGroupNameById = async (req: Request, res: Response) => {
    try {
        const groupName = await GroupNameModel.findById(req.params.id);
        if (!groupName) {
            return res.status(404).json({ success: false, message: 'Group name not found' });
        }

        return res.status(200).json({ success: true, data: groupName });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Fetching group name failed' });
    }
};

// Update a Group Name
export const updateGroupName = async (req: Request, res: Response) => {
    try {
        const { groupName, status } = req.body;
        
        const groupNameDoc = await GroupNameModel.findById(req.params.id);

        if (!groupNameDoc) {
            return res.status(404).json({ success: false, message: 'Group name not found' });
        }

        groupNameDoc.groupName = groupName ?? groupNameDoc.groupName;
        groupNameDoc.status = status ?? groupNameDoc.status;
        groupNameDoc.updatedAt = new Date();
        await groupNameDoc.save();

        return res.status(200).json({ success: true, message: 'Group name updated successfully', groupNameDoc });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Updating group name failed' });
    }
};
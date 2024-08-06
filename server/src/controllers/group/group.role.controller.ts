import { Request, Response } from "express";
import GroupAndRoleModel from "../../models/group/group.role.model";
import GroupNameModel from "../../models/group/group.names.model";
import RoleModel from "../../models/role.model";

export const createGroupAndRole = async (req: Request, res: Response) => {
    try {
        const { groupNameId, roleId } = req.body;
        const existingGroupAndRole = await GroupAndRoleModel.findOne({ groupNameId, roleId });
        if (existingGroupAndRole) {
            return res.status(400).json({ message: 'Group and role combination already exists' });
        }
        const newGroupAndRole = new GroupAndRoleModel({
            groupNameId,
            roleId
        });
        await newGroupAndRole.save();
        return res.status(201).json({ success: true, message: 'Group and role created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Group and role creation failed' });
    }
};

export const getGroupAndRoles = async (req: Request, res: Response) => {
    try {
        // Retrieve all GroupAndRole documents
        const groupAndRoles = await GroupAndRoleModel.find();

        // Retrieve group and role details for each GroupAndRole
        const response = await Promise.all(groupAndRoles.map(async (gr) => {
            const group = await GroupNameModel.findById(gr.groupNameId);
            const role = await RoleModel.findById(gr.roleId);

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
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve group and roles' });
    }
};


export const getGroupAndRoleById = async (req: Request, res: Response) => {
    try {
        const groupAndRole = await GroupAndRoleModel.findById(req.params.id);
        if (!groupAndRole) {
            return res.status(404).json({ message: 'Group and role not found' });
        }
        return res.status(200).json(groupAndRole);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve group and role' });
    }
};

export const updateGroupAndRole = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const groupAndRole = await GroupAndRoleModel.findById(req.params.id);
        if (!groupAndRole) {
            return res.status(404).json({ message: 'Group and role not found' });
        }

        groupAndRole.status = status || groupAndRole.status;
        groupAndRole.updatedAt = new Date();

        await groupAndRole.save();
        return res.status(200).json({ success: true, message: 'Group and role updated successfully', groupAndRole });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Group and role update failed' });
    }
};
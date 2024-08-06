import { Request, Response } from "express";
import UserAndRoleModel from "../../models/user/user.role.model";
import UserModel from "../../models/user/user.model";
import RoleModel from "../../models/role.model";

export const createUserAndRole = async (req: Request, res: Response) => {
    try {
        const { userId, roleId } = req.body;
        console.log(req.body)

        // Check if the association already exists
        const existingUserAndRole = await UserAndRoleModel.findOne({ userId, roleId });

        if (existingUserAndRole) {
            return res.status(400).json({ success: false, message: 'User and Role association already exists' });
        }

        // Create new UserAndRole entry
        const userAndRole = new UserAndRoleModel({ userId, roleId });
        await userAndRole.save();

        return res.status(201).json({ success: true, message: 'User and Role created successfully', userAndRole });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Creating user and role failed' });
    }
};


export const getAllUserAndRole = async (req: Request, res: Response) => {
    try {
        // Retrieve all UserAndRole documents
        const userAndRoles = await UserAndRoleModel.find();

        // Retrieve user and role details for each UserAndRole
        const response = await Promise.all(userAndRoles.map(async (ur) => {
            const user = await UserModel.findById(ur.userId);
            const role = await RoleModel.findById(ur.roleId);

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
                status:  ur.status,
                updatedAt: ur.updatedAt
            };
        }));

        const filteredResponse = response.filter(item => item !== null);
        return res.status(200).json({ success: true, data: filteredResponse });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Fetching user and role failed' });
    }
};

export const updateUserAndRole = async (req: Request, res: Response) => {
    try {
        const { userId, roleId, status } = req.body;
        const userAndRole = await UserAndRoleModel.findById(req.params.id);

        if (!userAndRole) {
            return res.status(404).json({ success: false, message: 'UserAndRole not found' });
        }

        userAndRole.updatedAt = new Date();
        userAndRole.status = status
        await userAndRole.save();

        return res.status(200).json({ success: true, message: 'UserAndRole updated successfully', userAndRole });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'UserAndRole update failed' });
    }
};
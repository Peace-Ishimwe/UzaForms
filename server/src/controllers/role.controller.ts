import { Request, Response } from "express";
import RoleModel from "../models/role.model";

export const createRole = async (req: Request, res: Response) => {
    try {
        const { roleName, roleDescription, status } = req.body
        console.log(req.body)
        const role = await RoleModel.findOne({ roleName: roleName })
        if(role){
            return res.status(400).json({ message: 'Role already exists' });
        }
        const newRole = new RoleModel({
            roleName: roleName,
            roleDescription: roleDescription,
            status: status
        })
        await newRole.save() 
        return res.status(201).json({ success: true, message: 'Role created successfully' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message:  'Role creation failed' });
    }
}

export const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await RoleModel.find();
        return res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve roles' });
    }
};

export const getRoleById = async (req: Request, res: Response) => {
    try {
        const role = await RoleModel.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        return res.status(200).json(role);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve role' });
    }
};

export const updateRole = async (req: Request, res: Response) => {
    try {
        const { roleName, roleDescription, status } = req.body;
        const role = await RoleModel.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        role.roleName = roleName || role.roleName;
        role.roleDescription = roleDescription || role.roleDescription;
        role.status = status || role.status;
        role.updatedAt = new Date();

        await role.save();
        return res.status(200).json({ success: true, message: 'Role updated successfully', role });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Role update failed' });
    }
};
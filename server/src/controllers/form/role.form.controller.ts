import { Request, Response } from "express";
import FormAndRoleModel from "../../models/form/role.form.model";
import FormNameModel from "../../models/form/form.name.model";
import RoleModel from "../../models/role.model";

export const createFormAndRole = async (req: Request, res: Response) => {
    try {
        const { formNameId, roleId } = req.body;
        const existingformAndRole = await FormAndRoleModel.findOne({ formNameId, roleId });
        if (existingformAndRole) {
            return res.status(400).json({ message: 'form and role combination already exists' });
        }
        const newformAndRole = new FormAndRoleModel({
            formNameId,
            roleId
        });
        await newformAndRole.save();
        return res.status(201).json({ success: true, message: 'form and role created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'form and role creation failed' });
    }
};

export const getFormAndRoles = async (req: Request, res: Response) => {
    try {
        // Retrieve all formAndRole documents
        const formAndRoles = await FormAndRoleModel.find();

        // Retrieve form and role details for each formAndRole
        const response = await Promise.all(formAndRoles.map(async (gr) => {
            const form = await FormNameModel.findById(gr.formNameId);
            const role = await RoleModel.findById(gr.roleId);

            if (!form || !role) {
                return null;
            }

            return {
                _id: gr._id,
                formNameId: gr.formNameId,
                roleId: gr.roleId,
                formName: form.formName,
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
        return res.status(500).json({ success: false, message: 'Failed to retrieve form and roles' });
    }
};


export const getFormAndRoleById = async (req: Request, res: Response) => {
    try {
        const formAndRole = await FormAndRoleModel.findById(req.params.id);
        if (!formAndRole) {
            return res.status(404).json({ message: 'form and role not found' });
        }
        return res.status(200).json(formAndRole);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve form and role' });
    }
};

export const updateFormAndRole = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const formAndRole = await FormAndRoleModel.findById(req.params.id);
        if (!formAndRole) {
            return res.status(404).json({ message: 'form and role not found' });
        }

        formAndRole.status = status || formAndRole.status;
        formAndRole.updatedAt = new Date();

        await formAndRole.save();
        return res.status(200).json({ success: true, message: 'form and role updated successfully', formAndRole });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'form and role update failed' });
    }
};
import { Request, Response } from "express";
import FormNameModel from "../../models/form/form.name.model";
import FormAndRoleModel from "../../models/form/role.form.model";
import UserModel from "../../models/user/user.model";
import GroupNameModel from "../../models/group/group.names.model";
import { FormDesignModel } from "../../models/form/form.design.model";

// Create a new form Name
export const createFormName = async (req: Request, res: Response) => {
    try {
        const { formName, status, createdBy, roles, groupNameId } = req.body;

        // Check if the form name already exists
        const existingformName = await FormNameModel.findOne({ formName });
        if (existingformName) {
            return res.status(400).json({ success: false, message: 'form name already exists' });
        }

        // Create new form Name entry
        const newformName = new FormNameModel({ formName, status, createdBy, groupNameId });
        await newformName.save();

        // Create entries in FormAndRoleModel for each role
        const roleEntries = roles.map((roleId: string) => ({
            formNameId: newformName._id,
            roleId,
            status,
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        await FormAndRoleModel.insertMany(roleEntries);

        return res.status(201).json({
            success: true,
            message: 'form name and roles created successfully',
            newformName,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Creating form name failed' });
    }
};

export const getAllFormNames = async (req: Request, res: Response) => {
    try {
        // Retrieve all formName documents
        const formNames = await FormNameModel.find();

        // Retrieve user details for each form
        const response = await Promise.all(formNames.map(async (form) => {
            const user = await UserModel.findById(form.createdBy);
            const group = await GroupNameModel.findById(form.groupNameId)
            const formDesign = await FormDesignModel.findOne({ formId: form._id })

            if (!user) {
                return {
                    _id: form._id,
                    formName: form.formName,
                    status: form.status,
                    groupName: group?.groupName,
                    createdBy: null,
                    createdAt: form.createdAt,
                    updatedAt: form.updatedAt
                };
            }
            if(!formDesign){
                return {
                    _id: form._id,
                    formName: form.formName,
                    status: form.status,
                    createdBy: {
                        firstName: user.firstName,
                        lastName: user.lastName
                    },
                    groupName: group?.groupName,
                    createdAt: form.createdAt,
                    updatedAt: form.updatedAt
                };
            }

            return {
                _id: form._id,
                formName: form.formName,
                status: form.status,
                createdBy: {
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                groupName: group?.groupName,
                formCreated: true,
                createdAt: form.createdAt,
                updatedAt: form.updatedAt
            };
        }));

        return res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Fetching form names failed' });
    }
};

// Get a single form Name by ID
export const getFormNameById = async (req: Request, res: Response) => {
    try {
        const formName = await FormNameModel.findById(req.params.id);
        if (!formName) {
            return res.status(404).json({ success: false, message: 'form name not found' });
        }

        return res.status(200).json({ success: true, data: formName });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Fetching form name failed' });
    }
};

// Update a form Name
export const updateFormName = async (req: Request, res: Response) => {
    try {
        const { formName, status } = req.body;
        
        const formNameDoc = await FormNameModel.findById(req.params.id);

        if (!formNameDoc) {
            return res.status(404).json({ success: false, message: 'form name not found' });
        }

        formNameDoc.formName = formName ?? formNameDoc.formName;
        formNameDoc.status = status ?? formNameDoc.status;
        formNameDoc.updatedAt = new Date();
        await formNameDoc.save();

        return res.status(200).json({ success: true, message: 'form name updated successfully', formNameDoc });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Updating form name failed' });
    }
};
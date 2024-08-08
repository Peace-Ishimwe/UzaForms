import { Request, Response } from 'express';
import { FormDesignModel } from '../../models/form/form.design.model';

export const createFormDesign = async (req: Request, res: Response) => {
    try {
        const form = new FormDesignModel(req.body);
        await form.save();
        return res.status(201).json({ success: true, message: 'Form design created successfully', form });
    } catch (error) {
        console.error('Error creating form:', error);
        return res.status(500).json({ success: false, message: 'Failed to create form' });
    }
};

export const getFormDesignById = async (req: Request, res: Response) => {
    try {
        const form = await FormDesignModel.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        return res.status(200).json(form);
    } catch (error) {
        console.error('Error fetching form:', error);
        return res.status(500).json({ message: 'Failed to fetch form' });
    }
};

export const updateFormDesign = async (req: Request, res: Response) => {
    try {
        const form = await FormDesignModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        return res.status(200).json(form);
    } catch (error) {
        console.error('Error updating form:', error);
        return res.status(500).json({ message: 'Failed to update form' });
    }
};


export const getAllFormDesigns = async (req: Request, res: Response) => {
    try {
        const forms = await FormDesignModel.find();
        return res.status(200).json(forms);
    } catch (error) {
        console.error('Error fetching forms:', error);
        return res.status(500).json({ message: 'Failed to fetch forms' });
    }
};
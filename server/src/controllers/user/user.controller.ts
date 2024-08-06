import { Request, Response } from "express";
import UserModel from "../../models/user/user.model";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve users' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve user' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { googleId, firstName, lastName, email, password, status } = req.body;
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.googleId = googleId || user.googleId;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.password = password || user.password;
        user.status = status || user.status;
        user.updatedAt = new Date();

        await user.save();
        return res.status(200).json({ success: true, message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'User update failed' });
    }
};


import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user/user.model";
import hashPassword from "../utils/hash.password";
import jwt, { JwtPayload } from "jsonwebtoken";
import OTPModel from "../models/otp.model";
import { userValidationSchema } from "../helpers/schema.validator";
import { ValidationError } from "joi"
import { extractPayload, verifyToken } from "../utils/jwt";
import RoleModel from "../models/role.model";
import UserAndRoleModel from "../models/user/user.role.model";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        try {
            await userValidationSchema.validateAsync(req.body, { abortEarly: false });
        } catch (validationError) {
            if (validationError instanceof ValidationError) {
                const errorMessages = validationError.details.map((detail) => detail.message).join(', ');
                return res.status(422).json({ message: `${errorMessages}` });
            }
            throw validationError;
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new UserModel({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();
        const newRole = new RoleModel({ roleName: 'Pending', roleDescription: 'New role' })
        await newRole.save()
        const newUserAndRole = new UserAndRoleModel({ userId: newUser._id, roleId: newRole._id })
        await newUserAndRole.save()


        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser.id, username: newUser.email, role: newRole.roleName },
            process.env.SECRET_KEY as string,
            {
                expiresIn: '72h',
                notBefore: '0',
                algorithm: 'HS256',
                audience: process.env.JWT_AUDIENCE as string,
                issuer: process.env.JWT_ISSUER as string,
            }
        );

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Registration failed. Please try again later.' });
    }
};


export const validateEmail = async (req: Request, res: Response) => {
    try {
        const { email, OTP } = req.body;
        const document = await OTPModel.findOne({ email }).sort({ createdAt: -1 });
        const user = await UserModel.findOne({ email });

        if (!document) {
            return res.status(401).json({ message: 'Invalid OTP: Email not found' });
        }

        if (document.otp === OTP) {
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            const userAndRole = await UserAndRoleModel.findOne({ userId: user._id });
            await RoleModel.updateOne({ _id: userAndRole?.roleId }, { roleName: 'User' });

            return res.status(200).json({ success: true, message: 'Email verified' });
        } else {
            console.log('Invalid OTP');
            return res.status(401).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error validating email:', error);
        return res.status(500).json({ message: 'Failed to validate email. Please try again.' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Authentication failed. User not found." });
        }
        const userAndRole = await UserAndRoleModel.findOne({ userId: user._id })
        const role = await RoleModel.findOne({ _id: userAndRole?.roleId })
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ userId: user.id, email: user.email, role: role?.roleName }, (process.env.SECRET_KEY as string)!, {
                expiresIn: '72h',
                notBefore: '0',
                algorithm: 'HS256',
                audience: process.env.JWT_AUDIENCE as string,
                issuer: process.env.JWT_ISSUER as string,
            });
            res.cookie('token', token);
            return res.status(200).json({
                success: true,
                message: "Authentication successful",
                userId: user._id,
                token
            });
        } else {
            return res
                .status(401)
                .json({ message: "Authentication failed. Password is incorrect." });
        }
    } catch (error) {
        console.error("Error while authenticating user:", error);
        return res
            .status(500)
            .json({ message: "Authentication failed. Please try again later." });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (passwordMatch) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
            return res.status(200).json({ message: 'Password changed successfully.' });
        } else {
            return res.status(401).json({ message: 'Current password is incorrect.' });
        }
    } catch (error) {
        console.error('Error while changing password:', error);
        return res.status(500).json({ message: 'Password change failed. Please try again later.' });
    }
};


export const passwordReset = async (req: Request, res: Response) => {
    try {
        const { email, otp, newPassword } = req.body;
        const latestOtp = await OTPModel.findOne({ email }).sort({ createdAt: -1 });
        if (!latestOtp || otp !== latestOtp.otp) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password updated successfully.",
        });
    } catch (error: any) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const logout = (req: Request, res: Response) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error: any) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Logout failed. Please try again later.' });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization || req.cookies.token || <string>req.headers['authorization'];
        if (!token) {
            return res.status(400).json({ message: 'Refresh token not provided' });
        }
        const decodedToken = jwt.decode(token) as { [key: string]: any };
        if (!decodedToken || !decodedToken.exp) {
            return res.status(400).json({ message: 'Invalid refresh token' });
        }
        const expiryTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const expiryThreshold = 5 * 60 * 1000;
        const timeUntilExpiry = expiryTime - currentTime;
        if (timeUntilExpiry < expiryThreshold) {
            const newToken = jwt.sign(
                {
                    userId: decodedToken.userId,
                    username: decodedToken.username,
                    role: decodedToken.role,
                },
                process.env.SECRET_KEY as string,
                {
                    expiresIn: '72h',
                    algorithm: 'HS256',
                    notBefore: '0',
                    audience: process.env.JWT_AUDIENCE as string,
                    issuer: process.env.JWT_ISSUER as string,
                }
            );
            res.cookie('token', newToken);
            return res.status(200).json({
                message: 'Token refreshed successfully',
                newToken,
            });
        } else {
            return res.status(200).json({
                message: 'Token is still valid',
                refreshToken: token,
            });
        }
    } catch (error: any) {
        console.error('Error refreshing token:', error);
        return res.status(500).json({ message: 'Token refresh failed. Please try again later.' });
    }
};

export const validateToken = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization || req.cookies.token || <string>req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const payload = extractPayload(token);
        if (!payload) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userPayload = payload as JwtPayload;
        const user = await UserModel.findById(userPayload.userId)

        return res.status(200).json({ success: true, message: "token is valid", user })
    } catch (error) {
        console.error('Error validating token:', error);
        return res.status(500).json({ success: false, message: 'Validation failed..' });
    }
}

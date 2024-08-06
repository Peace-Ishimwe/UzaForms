import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

/**
 * Middleware to check user authentication using a JWT token stored in a cookie.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization || req.cookies.token || <string>req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ authenticated: false, message: 'Authentication token not found' });
        }
        jwt.verify(token, process.env.SECRET_KEY as string, (err: any, decodedToken: any) => {
            if (err) {
                if (err instanceof TokenExpiredError) {
                    return res.status(401).json({ authenticated: false, message: 'Token has expired' });
                } else {
                    return res.status(401).json({ authenticated: false, message: 'Invalid token' });
                }
            }
            (req as any).user = {
                userId: decodedToken.userID,
                userType: decodedToken.userType,
            };
            next();
        });
    } catch (error) {
        next(error);
    }
};
import { Router, Request, Response } from 'express';
import passport from 'passport';
import { registerUser, loginUser, changePassword, passwordReset, logout, refreshToken, validateEmail, validateToken } from '../controllers/auth.controller';
import { checkAuth } from '../middlewares/auth.middleware';
import dotenv from 'dotenv';

dotenv.config();

const authRoutes = Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.post('/validate/email', validateEmail);
authRoutes.post('/change-password', checkAuth, changePassword);
authRoutes.post('/password-reset', passwordReset);
authRoutes.get('/logout', checkAuth, logout);
authRoutes.post('/refresh-token', checkAuth, refreshToken);
authRoutes.get('/validate/token', validateToken);

authRoutes.get('/google/failed', (req: Request, res: Response) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});

authRoutes.get('/google/success', (req: Request, res: Response) => {
    if (req.user) {
        res.status(200).json({ message: "User login successful", user: req.user });
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
});

authRoutes.get('/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })
);

authRoutes.get('/google/callback',
    passport.authenticate('google', { session: false }),
    (req: Request, res: Response) => {
        if (req.user && (req.user as any).token) {
            res.cookie('token', (req.user as any).token, { httpOnly: false, secure: process.env.NODE_ENV === 'production' });
            res.redirect(process.env.CLIENT_URL as string);
        } else {
            res.redirect(process.env.CLIENT_URL as string + 'auth/login');
        }
    }
);

export default authRoutes;
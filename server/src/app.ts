import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import cookieSession from 'cookie-session'
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/database';

import { authRoutes, formAndRoleRoutes, formNameRoutes, groupAndRoleRoutes, groupNameRoutes, otpRoutes, userAndRoleRoutes, userRoutes } from "./routes/routes"
import { errorHandler, AppError } from './middlewares/error.middleware';

dotenv.config();
connectDB();

import "./config/passport"
import roleRoutes from './routes/role.routes';

const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cookieSession({
	name: 'google-auth-session',
	keys: [process.env.COOKIE_KEY as string]
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/v1/api', authRoutes);
app.use('/v1/api', otpRoutes);
app.use('/v1/api', roleRoutes);
app.use('/v1/api', userRoutes);
app.use('/v1/api', userAndRoleRoutes)
app.use('/v1/api', groupNameRoutes)
app.use('/v1/api', groupAndRoleRoutes)
app.use('/v1/api', formNameRoutes)
app.use('/v1/api', formAndRoleRoutes)
// Route not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
	const error = new AppError('Not Found', 404);
	next(error);
});
// Global error handling middleware
app.use(errorHandler);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
	next(err);
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
})
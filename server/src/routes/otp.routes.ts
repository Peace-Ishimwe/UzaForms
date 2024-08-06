import { Router } from 'express';
import { sendOTP } from '../controllers/otp.controller';

const otpRoutes = Router();

otpRoutes.post('/send-otp', sendOTP);

export default otpRoutes;
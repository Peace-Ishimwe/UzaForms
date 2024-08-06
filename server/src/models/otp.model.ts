import mongoose, { Schema, Document, Model } from 'mongoose';
import sendVerificationEmail from '../utils/mail.template';

interface IOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpSchema: Schema<IOtp> = new Schema<IOtp>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '15m' },
});

otpSchema.pre('save', async function (next) {
  console.log('New document saved to the database');
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const OTPModel: Model<IOtp> = mongoose.model<IOtp>('OTPs', otpSchema);
export default OTPModel;
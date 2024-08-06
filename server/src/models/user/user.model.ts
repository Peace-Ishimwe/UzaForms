import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  googleId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: 'ENABLED' | 'DISABLED';
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>({
  googleId: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: {
    type: String,
    enum: ['ENABLED', 'DISABLED'],
    default: 'ENABLED'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default UserModel;

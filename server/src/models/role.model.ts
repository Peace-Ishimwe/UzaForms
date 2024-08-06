import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  roleName: string;
  roleDescription: string;
  status: 'ENABLED' | 'DISABLED';
  createdAt: Date,
  updatedAt: Date
}

const userSchema = new Schema<IUser>({
  roleName: {
    type: String,
    default: 'Pending',
  },
  roleDescription: { type: String, required: true },
  status: {
    type: String,
    enum: ['ENABLED', 'DISABLED'],
    default: 'DISABLED'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const RoleModel: Model<IUser> = mongoose.model<IUser>('Roles', userSchema);

export default RoleModel;
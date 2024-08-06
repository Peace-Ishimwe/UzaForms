import mongoose, { Schema, Document, Model, ObjectId } from 'mongoose';

interface IUser extends Document {
    userId: ObjectId,
    roleId: ObjectId,
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new Schema<IUser>({
    userId: { type: String, required: true },
    roleId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const UserAndRoleModel: Model<IUser> = mongoose.model<IUser>('UserAndRoles', userSchema);

export default UserAndRoleModel;
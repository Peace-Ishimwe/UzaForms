import mongoose, { Schema, Document, Model, ObjectId } from 'mongoose';

interface IGroupRole extends Document {
    groupNameId: ObjectId,
    roleId: ObjectId,
    status: 'ENABLED' | 'DISABLED'
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new Schema<IGroupRole>({
    groupNameId: { type: String, required: true },
    roleId: { type: String, required: true },
    status: {
        type: String,
        enum: ['ENABLED', 'DISABLED'],
        default: 'ENABLED'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const GroupAndRoleModel: Model<IGroupRole> = mongoose.model<IGroupRole>('GroupNameAndRoles', userSchema);

export default GroupAndRoleModel;
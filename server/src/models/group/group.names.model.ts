import mongoose, { Schema, Document, Model } from 'mongoose';

interface IGName extends Document {
    groupName: string;
    status: 'ENABLED' | 'DISABLED';
    createdBy: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IGName>({
    groupName: { type: String, required: true },
    status: {
        type: String,
        enum: ['ENABLED', 'DISABLED'],
        default: 'ENABLED'
    },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const GroupNameModel: Model<IGName> = mongoose.model<IGName>('GroupNames', userSchema);

export default GroupNameModel;
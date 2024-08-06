import mongoose, { Schema, Document, Model } from 'mongoose';

interface IGName extends Document {
    formName: string;
    status: 'ENABLED' | 'DISABLED';
    createdBy: string;
    groupNameId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IGName>({
    formName: { type: String, required: true },
    status: {
        type: String,
        enum: ['ENABLED', 'DISABLED'],
        default: 'ENABLED'
    },
    createdBy: { type: String, required: true },
    groupNameId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const FormNameModel: Model<IGName> = mongoose.model<IGName>('formNames', userSchema);

export default FormNameModel;
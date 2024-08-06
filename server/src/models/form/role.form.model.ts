import mongoose, { Schema, Document, Model, ObjectId } from 'mongoose';

interface IformRole extends Document {
    formNameId: ObjectId,
    roleId: ObjectId,
    status: 'ENABLED' | 'DISABLED'
    createdAt: Date,
    updatedAt: Date
}

const formSchema = new Schema<IformRole>({
    formNameId: { type: String, required: true },
    roleId: { type: String, required: true },
    status: {
        type: String,
        enum: ['ENABLED', 'DISABLED'],
        default: 'ENABLED'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const FormAndRoleModel: Model<IformRole> = mongoose.model<IformRole>('formNameAndRoles', formSchema);

export default FormAndRoleModel;
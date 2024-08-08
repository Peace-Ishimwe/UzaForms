
import mongoose, { Schema, Document, Model } from 'mongoose';

interface IAddTitle extends Document {
  roleName: string;
  roleDescription: string;
  status: 'ENABLED' | 'DISABLED';
  createdAt: Date,
  updatedAt: Date
}

const addTitleSchema = new Schema<IAddTitle>({
  roleName: {
    type: String,
    default: 'Pending',
  },
  roleDescription: { type: String, required: true },
  status: {
    type: String,
    enum: ['ENABLED', 'DISABLED'],
    default: 'ENABLED'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const AddTittleModel: Model<IAddTitle> = mongoose.model<IAddTitle>('question-add-title', addTitleSchema);

export default AddTittleModel;
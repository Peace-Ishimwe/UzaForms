import mongoose, { Schema, Document, Model } from 'mongoose';

interface IQuestions extends Document {
    questionId: string,
    questionType: string,
    questionDetail: string,
    sectionId: string,
    formId: string,
    createdAt: Date,
    updatedAt: Date
}

const questionSchema = new Schema<IQuestions>({
    questionId: { type: String, required: true },
    questionType: { type: String, required: true },
    questionDetail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const QuestionModel: Model<IQuestions> = mongoose.model<IQuestions>('question-add-title', questionSchema);

export default QuestionModel;
import mongoose, { Document, Schema, model } from 'mongoose';

// Define the Question schema
const QuestionSchema = new Schema({
    id: { type: String, required: true },
    type: { type: String, required: true },
    label: { type: String },
    value: { type: String },
    required: { type: String },
    video: { type: Schema.Types.Mixed }, // Can store any type of data
    titleName: { type: String },
    urlName: { type: String },
    descriptionName: { type: String },
    document: { type: Schema.Types.Mixed }, // Can store any type of data
    image: { type: Schema.Types.Mixed }, // Can store any type of data
    minCharacters: { type: Number },
    maxCharacters: { type: Number },
    decimalOptions: { type: String },
    numberOfDecimals: { type: Number },
    attributes: { type: String },
    attributeValue: { type: Number },
    documentType: { type: String },
    maxFileSize: { type: Number },
    file: { type: Schema.Types.Mixed }, // Can store any type of data
    dateType: { type: String },
    dropdownType: { type: String },
    options: { type: [String] }, // Array of strings for dropdown options
    nextSections: { type: Map, of: String }, // Map of key-value pairs
    numberOfOptions: { type: Number },
    selectOptions: { type: String },
}, { _id: false });

// Define the Section schema
const SectionSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String },
    questions: [QuestionSchema], // An array of questions
}, { _id: false });

// Define the Form schema
const FormSchema = new Schema({
    formId: { type: String, required: true },
    sections: [SectionSchema], // An array of sections
});

// Create the Mongoose models
const FormDesignModel = model<Document & { formName: string }>('form-design', FormSchema);

export { FormDesignModel };
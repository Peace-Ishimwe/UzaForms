export interface FormInputValues {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface SectionTypes {
    id: string;
    name: string;
    questions: QuestionTypes[];
    nextSection?: string;
}

export interface QuestionTypes {
    id: string;
    type: string;
    label?: string;
    value?: string;
    required?: string;
    maxCharacters?: number;
    decimalType?: string;
    attributes?: string;
    documentType?: string;
    maxFileSize?: string;
    file?: File;
  }
  
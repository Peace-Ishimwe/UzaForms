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
    title?: string;
    type: string;
    label?: string;
    value?: string;
    required?: string;
    video?: any;
    titleName?: string;
    urlName?: string;
    descriptionName?: string;
    document?: any;
    image?: any;
    maxCharacters?: number;
    decimalOptions?: string;
    numberOfDecimals?: number;
    attributes?: string;
    attributeValue?: string;
    documentType?: string;
    maxFileSize?: string;
    file?: File;
    dropdownType?: string;
    options?: string[];
    nextSections?: { [key: number]: string };
    numberOfOptions?: number;
    selectOptions?: string;
}
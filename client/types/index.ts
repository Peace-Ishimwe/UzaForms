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
    nextSectionId: string;
}

export interface QuestionTypes {
    id: string;
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
    minCharacters?: number;
    decimalOptions?: string;
    numberOfDecimals?: number;
    attributes?: string;
    attributeValue?: number;
    documentType?: string;
    maxFileSize?: number;
    dateType?: string;
    file?: any;
    formData?: FormData;
    dropdownType?: string;
    options?: string[];
    nextSections?: { [key: number]: string };
    numberOfOptions?: number;
    selectOptions?: string;
}
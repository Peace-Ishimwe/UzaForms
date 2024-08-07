import React, { useState } from 'react';
import { QuestionTypes } from '@/types';
import { useFormStore } from '@/store/form-desgn/formStore';

interface Props {
    question: QuestionTypes;
    questionIndex: number;
    sectionIndex: number;
}

const AddDocument: React.FC<Props> = ({ question, questionIndex, sectionIndex }) => {
    const { sections, updateSection } = useFormStore();
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedQuestion = { ...question, addDocument: reader.result };
                const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
                updatedSection.questions[questionIndex] = updatedQuestion;
                updateSection(sectionIndex, updatedSection);
            };
            reader.readAsDataURL(selectedFile); // You can also use readAsText or readAsArrayBuffer based on your needs
        }
    };

    return (
        <div className="space-y-6">
            <div className="py-2 border-b -mx-4">
                <label>{question.label}</label>
            </div>
            <div className="flex space-x-4 items-center">
                <p className='whitespace-nowrap'>Add document: </p>
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    value={question.addDocument}
                    className="border p-2 w-full"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default AddDocument;
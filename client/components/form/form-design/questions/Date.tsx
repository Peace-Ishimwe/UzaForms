import React from 'react'
import { createFormStore } from '@/store/form-design/formStore';
import { QuestionTypes } from '@/types';
import { useParams } from 'next/navigation';

interface dropDownProps {
    question: QuestionTypes,
    questionIndex: number;
    sectionIndex: number;
}

const Date: React.FC<dropDownProps> = ({ question, sectionIndex, questionIndex }) => {
    const params = useParams()
    const formId = params?.formId as string
    const { sections, updateSection } = createFormStore(formId)();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedQuestion = { ...question, [name]: value };
        const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
        updatedSection.questions[questionIndex] = updatedQuestion;
        updateSection(sectionIndex, updatedSection);
    };

    return (
        <div className='space-y-6'>
            <div className='py-2 border-b -mx-4'>
            </div>
            <div className='space-y-4'>
                <div className='flex space-x-9 items-center w-full'>
                    <label>Label: </label>
                    <input
                        type="text"
                        name="label"
                        value={question.label || ''}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div className='flex space-x-3 items-center w-full'>
                    <label>Required: </label>
                    <select
                        name="required"
                        value={question.required || ''}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="">Choose an answer</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className='flex space-x-3 items-center w-full'>
                    <label className='whitespace-nowrap'>Date Type: </label>
                    <select
                        name="dateType"
                        value={question.dateType || ''}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="">Choose an answer</option>
                        <option value="date-only">Date Only</option>
                        <option value="time-only">Time Only</option>
                        <option value="date-time">Date And Time</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Date;
import React from 'react';
import { QuestionTypes } from '@/types';
import { createFormStore } from '@/store/form-design/formStore';
import { useParams } from 'next/navigation';

interface Props {
    question: QuestionTypes;
    questionIndex: number;
    sectionIndex: number;
}

const AddVideo: React.FC<Props> = ({ question, questionIndex, sectionIndex }) => {
    const params = useParams()
    const formId = params?.formId as string
    const { sections, updateSection } = createFormStore(formId)();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedQuestion = { ...question, video: e.target.value };
        const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
        updatedSection.questions[questionIndex] = updatedQuestion;
        updateSection(sectionIndex, updatedSection);
    };

    return (
        <div className='space-y-6'>
            <div className='py-2 border-b -mx-4'>
            </div>
            <div className='flex space-x-4  items-center'>
                <p className='whitespace-nowrap'>Add Video IFrame: </p>
                <textarea
                    value={question.video}
                    className="border p-2 w-full"
                    placeholder='Video IFrame'
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default AddVideo;
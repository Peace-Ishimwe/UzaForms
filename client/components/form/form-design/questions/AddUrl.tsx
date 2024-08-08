import React from 'react';
import { QuestionTypes } from '@/types';
import { useFormStore } from '@/store/form-design/formStore';

interface Props {
  question: QuestionTypes;
  questionIndex: number;
  sectionIndex: number;
}

const AddUrl: React.FC<Props> = ({ question, questionIndex, sectionIndex }) => {
  const { sections, updateSection } = useFormStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestion = { ...question, urlName: e.target.value };
    const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
    updatedSection.questions[questionIndex] = updatedQuestion;
    updateSection(sectionIndex, updatedSection);
  };

  return (
    <div className="space-y-6">
      <div className="py-2 border-b -mx-4">
      </div>
      <div className="flex space-x-4 items-center">
        <p>URL: </p>
        <input
          type='text'
          value={question.urlName || ''}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder='ex: https://orbit-23.vercel.app'
        />
      </div>
    </div>
  );
};

export default AddUrl;
import React from 'react';
import { useFormStore } from '@/store/form-desgn/formStore';
import { QuestionTypes } from '@/types';

interface Props {
  question: QuestionTypes;
  questionIndex: number;
  sectionIndex: number;
}

const DropDown: React.FC<Props> = ({ question, sectionIndex, questionIndex }) => {
  const { sections, updateSection } = useFormStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedQuestion = { ...question, value: e.target.value };
    const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
    updatedSection.questions[questionIndex] = updatedQuestion;
    updateSection(sectionIndex, updatedSection);
  };

  return (
    <div className='space-y-6'>
      <div className='py-2 border-b -mx-4'>
        <label>{question.label}</label>
      </div>
      <div className='flex space-x-4  items-center'>
        <p>Add Video IFrame: </p>
        <select
          value={question.label || ''}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select...</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          {/* Add more dropdown options dynamically here */}
        </select>
      </div>
    </div>
  );
};

export default DropDown;
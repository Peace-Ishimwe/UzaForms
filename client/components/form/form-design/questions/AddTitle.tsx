import React from 'react';
import { QuestionTypes } from '@/types';
import { useFormStore } from '@/store/form-desgn/formStore';

interface Props {
  question: QuestionTypes;
  questionIndex: number;
  sectionIndex: number;
}

const AddTitle: React.FC<Props> = ({ question, questionIndex, sectionIndex }) => {
  const { sections, updateSection } = useFormStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedQuestion = { ...question, titleName: e.target.value };
    const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
    updatedSection.questions[questionIndex] = updatedQuestion;
    updateSection(sectionIndex, updatedSection);
  };

  return (
    <div className="space-y-6">
      <div className="py-2 border-b -mx-4">
        <label>{question.label}</label>
      </div>
      <div className="flex space-x-4 items-center">
        <p>Description: </p>
        <textarea
          value={question.titleName || ''}
          onChange={handleChange}
          className="border p-2 w-full font-bold text-lg"
        />
      </div>
    </div>
  );
};

export default AddTitle;
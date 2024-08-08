import { useFormStore } from '@/store/form-design/formStore';
import { QuestionTypes } from '@/types';
import React from 'react';

interface Props {
  question: QuestionTypes;
  questionIndex: number;
  sectionIndex: number;
}

const ShortText: React.FC<Props> = ({ question, sectionIndex, questionIndex }) => {
  const { sections, updateSection } = useFormStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedQuestion = { ...question, [name]: value };
    const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
    updatedSection.questions[questionIndex] = updatedQuestion;
    updateSection(sectionIndex, updatedSection);
  };

  return (
    <div className='space-y-6'>
      <div className='py-2 border-b -mx-4'>
        <label>{question.title}</label>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choose an answer</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className='flex space-x-9 items-center w-full'>
          <label className='whitespace-nowrap'>Max Characters: </label>
          <input
            type="number"
            name="maxCharacters"
            value={question.maxCharacters || ''}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder='Max Characters'
          />
        </div>
        <div className='flex space-x-9 items-center w-full'>
          <label className='whitespace-nowrap'>Attributes: </label>
          <select
            name="attributes"
            value={question.attributes || ''}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choose an answer</option>
            <option value="regular-text">Regular text</option>
            <option value="email">Email</option>
            <option value="url">URL</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ShortText;
import React from 'react';
import { useFormStore } from '@/store/form-desgn/formStore';
import { QuestionTypes } from '@/types';

interface Props {
  question: QuestionTypes;
  questionIndex: number;
  sectionIndex: number;
}

const Number: React.FC<Props> = ({ question, sectionIndex, questionIndex }) => {
  const { sections, updateSection } = useFormStore();

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
        <label>{question.label}</label>
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
            placeholder='Number'
          />
        </div>
        <div className='flex space-x-3 items-center w-full'>
          <label>Required: </label>
          <select
            name="required"
            value={question.required || ''}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 block w-full p-2.5 dark:text-white"
          >
            <option value="">Choose an answer</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className='flex space-x-9 items-center w-full'>
          <label className='whitespace-nowrap'>Max Characters: </label>
          <input
            type="text"
            name="maxCharacters"
            value={question.maxCharacters || ''}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder='Max Characters'
          />
        </div>
        <div className='flex space-x-9 items-center w-full'>
          <label className='whitespace-nowrap'>With Decimals or Not: </label>
          <div className='flex border p-1'>
            <input
              type="text"
              name="decimalType"
              value={question.decimalType || ''}
              onChange={handleChange}
              className='w-full outline-none'
            />
            <select
              name="decimalType"
              value={question.decimalType || ''}
              onChange={handleChange}
              className="bg-primary text-white border rounded-md text-sm focus:ring-blue-500 block p-2.5 dark:text-white w-[200px]"
            >
              <option value="">Select here</option>
              <option value="with-decimals">With Decimals</option>
              <option value="without-decimals">Without Decimals</option>
            </select>
          </div>
        </div>
        <div className='flex space-x-9 items-center w-full'>
          <label className='whitespace-nowrap'>Attributes: </label>
          <select
            name="attributes"
            value={question.attributes || ''}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 block w-full p-2.5 dark:text-white"
          >
            <option value="">Select here</option>
            <option value="greater-than">Greater than</option>
            <option value="greater-equals">Greater or equals to</option>
            <option value="equals">Equals to</option>
            <option value="not-equals">Not Equals to</option>
            <option value="less-than">Less than</option>
            <option value="less-equals">Less than or equals to</option>
            <option value="between">Between</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Number;
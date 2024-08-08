import React from 'react';
import { useFormStore } from '@/store/form-design/formStore';
import { QuestionTypes } from '@/types';

interface Props {
  question: QuestionTypes;
  questionIndex: number;
  sectionIndex: number;
}

const Checkbox: React.FC<Props> = ({ question, sectionIndex, questionIndex }) => {
  const { sections, updateSection } = useFormStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedQuestion = { ...question, [name]: value };
    const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
    updatedSection.questions[questionIndex] = updatedQuestion;
    updateSection(sectionIndex, updatedSection);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...(question.options || [])];
    updatedOptions[index] = value;
    const updatedQuestion = { ...question, options: updatedOptions };
    const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
    updatedSection.questions[questionIndex] = updatedQuestion;
    updateSection(sectionIndex, updatedSection);
  };

  const addOption = () => {
    const updatedOptions = [...(question.options || []), ''];
    const updatedQuestion = { ...question, options: updatedOptions };
    const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
    updatedSection.questions[questionIndex] = updatedQuestion;
    updateSection(sectionIndex, updatedSection);
  };

  const removeOption = (index: number) => {
    const updatedOptions = [...(question.options || [])];
    updatedOptions.splice(index, 1);
    const updatedQuestion = { ...question, options: updatedOptions };
    const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
    updatedSection.questions[questionIndex] = updatedQuestion;
    updateSection(sectionIndex, updatedSection);
  };

  return (
    <div className='space-y-6'>
      <div className='py-2 border-b -mx-4'>
      </div>
      <div className='flex space-x-4 items-center'>
        <label className='whitespace-nowrap'>Label: </label>
        <input
          type="text"
          name="label"
          value={question.label || ''}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder='Label'
        />
      </div>
      <div className='flex space-x-4 items-center'>
        <label className='whitespace-nowrap'>Required: </label>
        <select
          name="required"
          value={question.required || ''}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">Choose an answer</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className='flex space-x-4 items-center'>
        <label className='whitespace-nowrap'>Select Options: </label>
        <select
          name="selectOptions"
          value={question.selectOptions || 'select-at-least'}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="select-at-least">Select at least</option>
          <option value="select-at-most">Select at most</option>
          <option value="select-exactly">Select exactly</option>
        </select>
      </div>
      <div className='flex space-x-4 items-center'>
        <label className='whitespace-nowrap'>Number of Options: </label>
        <input
          type="number"
          name="numberOfOptions"
          value={question.numberOfOptions || ''}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder='Number here'
        />
      </div>
      <div className='space-y-4'>
        {question.options && question.options.map((option, index) => (
          <div key={index} className='flex space-x-4 items-center'>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="border p-2 w-full"
              placeholder={`Option ${index + 1}`}
            />
            <button type="button" onClick={() => removeOption(index)} className="text-red-500">X</button>
          </div>
        ))}
        <button type="button" onClick={addOption} className="text-blue-500">Add new option</button>
      </div>
    </div>
  );
};

export default Checkbox;
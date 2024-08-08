import React from 'react';
import { useFormStore } from '@/store/form-design/formStore';
import { QuestionTypes } from '@/types';
import SearchSection from '../SearchSection';

interface Props {
  question: QuestionTypes;
  questionIndex: number;
  sectionIndex: number;
}

const DropDown: React.FC<Props> = ({ question, sectionIndex, questionIndex }) => {
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

  const handleSelectSection = (optionIndex: number, value: string) => {
    const updatedNextSections = { ...(question.nextSections || {}), [optionIndex]: value };
    const updatedQuestion = { ...question, nextSections: updatedNextSections };
    const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
    updatedSection.questions[questionIndex] = updatedQuestion;
    updateSection(sectionIndex, updatedSection);
  };

  const sectionOptions = sections.map((section, index) => ({
    title: `Section ${index + 1}: ${section.name}`,
    value: `Section-${index + 1}-${section.name}`
  }));

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
        <label className='whitespace-nowrap'>Dropdown Type: </label>
        <select
          name="dropdownType"
          value={question.dropdownType || 'simple'}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="simple">Simple</option>
          <option value="with-next-section">With Next Section</option>
          <option value="from-database">From Database</option>
        </select>
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
            {question.dropdownType === 'with-next-section' && (
              <SearchSection
                options={sectionOptions}
                onSelect={(value) => handleSelectSection(index, value)}
              />
            )}
            <button type="button" onClick={() => removeOption(index)} className="text-red-500">X</button>
          </div>
        ))}
        <button type="button" onClick={addOption} className="text-blue-500">Add new option</button>
      </div>
    </div>
  );
};

export default DropDown;
import React from 'react';
import { createFormStore } from '@/store/form-design/formStore';
import { QuestionTypes } from '@/types';
import { useParams } from 'next/navigation';

interface Props {
  question: QuestionTypes;
  questionIndex: number;
  sectionIndex: number;
}

const Upload: React.FC<Props> = ({ question, sectionIndex, questionIndex }) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedQuestion = { ...question, file };
      const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
      updatedSection.questions[questionIndex] = updatedQuestion;
      updateSection(sectionIndex, updatedSection);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='py-2 border-b -mx-4'>
      </div>
      <div className='space-y-4'>
        <div className='space-y-2 flex space-x-3 items-center w-full'>
          <label>Label: </label>
          <input
            type="text"
            name="label"
            value={question.label || ''}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder='upload label'
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
        <div className='flex space-x-3 items-center w-full'>
          <label>Document: </label>
          <select
            name="documentType"
            value={question.documentType || ''}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 block w-full p-2.5 dark:text-white"
          >
            <option value="">Choose an answer</option>
            <option value="pdf">PDF</option>
            <option value="image">Image</option>
            <option value="document">Document</option>
            <option value="spreadsheet">Spreadsheet</option>
            <option value="presentation">Presentation</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
          </select>
        </div>
        <div className='flex space-x-9 items-center w-full'>
          <label className='whitespace-nowrap'>Max File Size: </label>
          <input
            type="number"
            name="maxFileSize"
            value={question.maxFileSize || ''}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder='Max File size'
          />
        </div>
      </div>
    </div>
  );
};

export default Upload;
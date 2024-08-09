import React from 'react';

interface CheckboxProps {
  question: any
}

const Checkbox: React.FC<CheckboxProps> = ({ question }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">
        {question.label} {question.required && <span className="text-red-500">*</span>}
      </label>
      {question.options.map((option: string, index: number) => (
        <div key={index} className="flex items-center mb-2">
          <input type="checkbox" id={`checkbox-${index}`} className="h-4 w-4 mr-2" />
          <label htmlFor={`checkbox-${index}`}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default Checkbox;
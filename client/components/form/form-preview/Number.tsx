import React from 'react';

interface NumberProps {
  question: any
}

const Number: React.FC<NumberProps> = ({ question }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">
        {question.label} {question.required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="number"
        maxLength={question.maxCharacters}
        placeholder={`Enter a number`}
        className="w-full p-2 border rounded"
        required={question.required}
      />
    </div>
  );
};

export default Number;
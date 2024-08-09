import React from 'react';

interface ShortTextProps {
    question: any
}

const ShortText: React.FC<ShortTextProps> = ({ question }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">
        {question.label} {question.required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        maxLength={question.maxCharacters}
        placeholder={`Enter up to ${question.maxCharacters} characters`}
        className="w-full p-2 border rounded"
        required={question.required}
      />
    </div>
  );
};

export default ShortText;

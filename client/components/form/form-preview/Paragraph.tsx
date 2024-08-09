import React from 'react';

interface ParagraphProps {
 question: any
}

const Paragraph: React.FC<ParagraphProps> = ({ question }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">
        {question.label} {question.required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        minLength={question.minCharacters}
        maxLength={question.maxCharacters}
        placeholder={`Enter between ${question.minCharacters} and ${question.maxCharacters} characters`}
        className="w-full p-2 border rounded"
        required={question.required}
      ></textarea>
    </div>
  );
};

export default Paragraph;

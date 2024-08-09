import React from 'react';

interface DateProps {
 question: any
}

const Date: React.FC<DateProps> = ({ question }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">
        {question.label} {question.required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={question.dateType === 'date-only' ? 'date' : 'datetime-local'}
        className="w-full p-2 border rounded"
        required={question.required}
      />
    </div>
  );
};

export default Date;
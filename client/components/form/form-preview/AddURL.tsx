import React from 'react';

interface AddURLProps {
  question: any;
}

const AddURL: React.FC<AddURLProps> = ({ question }) => {
  return (
    <a href={question} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mb-4 block">
      {question.urlName}
    </a>
  );
};

export default AddURL;

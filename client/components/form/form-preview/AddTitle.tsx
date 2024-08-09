import React from 'react';

interface AddTitleProps {
  question: any;
}

const AddTitle: React.FC<AddTitleProps> = ({ question }) => {
  return <h2 className="text-xl font-bold mb-4">{question.titleName}</h2>;
};

export default AddTitle;
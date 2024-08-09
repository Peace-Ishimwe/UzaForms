import React from 'react';

interface AddDescriptionProps {
  question: any;
}

const AddDescription: React.FC<AddDescriptionProps> = ({ question }) => {
  return <p className="mb-4">{question.descriptionName}</p>;
};

export default AddDescription;
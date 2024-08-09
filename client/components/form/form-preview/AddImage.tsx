import React from 'react';

interface AddImageProps {
  question: any;
}

const AddImage: React.FC<AddImageProps> = ({ question }) => {
  return <img src={`/uploads/${question.image}`} alt="Uploaded" className="mb-4 max-w-full" />;
};

export default AddImage;
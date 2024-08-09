import React from 'react';

interface AddVideoProps {
  question: any;
}

const AddVideo: React.FC<AddVideoProps> = ({ question }) => {
  return <div className="mb-4" dangerouslySetInnerHTML={{ __html: question.video }} />;
};

export default AddVideo;
import React from 'react';

interface AddDocumentProps {
  question: any;
}

const AddDocument: React.FC<AddDocumentProps> = ({ question }) => {
  return (
    <a href={`/path/to/documents/${question.document}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mb-4 block">
      Download Document
    </a>
  );
};

export default AddDocument;
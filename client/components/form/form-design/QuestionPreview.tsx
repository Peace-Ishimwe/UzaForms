import React from 'react';
import AddTitle from '../form-preview/AddTitle';
import AddDescription from '../form-preview/AddDescription';
import AddURL from '../form-preview/AddURL';
import AddDocument from '../form-preview/AddDocument';
import AddImage from '../form-preview/AddImage';
import AddVideo from '../form-preview/AddVideo';
import ShortText from '../form-preview/ShortText';
import Paragraph from '../form-preview/Paragraph';
import Date from '../form-preview/Date';
import Number from '../form-preview/Number';
import Checkbox from '../form-preview/Checkbox';
import Dropdown from '../form-preview/Dropdown';
import { QuestionTypes } from '@/types';

interface QuestionPreviewProps {
  question: QuestionTypes;
  questionIndex: number;
  sectionIndex: number;
  onDropdownChange: (questionId: string, selectedOptionIndex: number) => void;
}

const QuestionPreview: React.FC<QuestionPreviewProps> = ({ question, onDropdownChange }) => {

  const handleDropdownChange = (selectedOptionIndex: number) => {
    onDropdownChange(question.id, selectedOptionIndex);
  };

  const renderPreview = () => {
    switch (question.type) {
      case 'Add Title':
        return <AddTitle question={question} />;
      case 'Add Description':
        return <AddDescription question={question} />;
      case 'Add URL':
        return <AddURL question={question} />;
      case 'Add Document':
        return <AddDocument question={question} />;
      case 'Add Image':
        return <AddImage question={question} />;
      case 'Add Video':
        return <AddVideo question={question} />;
      case 'Short Text':
        return <ShortText question={question} />;
      case 'Paragraph':
        return <Paragraph question={question} />;
      case 'Date':
        return <Date question={question} />;
      case 'Number':
        return <Number question={question} />;
      case 'Checkbox':
        return <Checkbox question={question} />;
      case 'Dropdown':
        return <Dropdown question={question} onChange={handleDropdownChange} />;
      default:
        return <p>Unknown question type: {question.type}</p>;
    }
  };

  return <div className="mb-4">{renderPreview()}</div>;
};

export default QuestionPreview;
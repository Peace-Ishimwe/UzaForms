import React from 'react';
import { QuestionTypes } from '@/types';
import DropDown from './questions/DropDown';
import ShortText from './questions/ShortText';
import Paragraph from './questions/Paragraph';
import Number from './questions/Number';
import Upload from './questions/Upload';
import AddTittle from './questions/AddTitle';
import AddDescription from './questions/AddDescription';
import AddUrl from './questions/AddUrl';
import AddDocument from './questions/AddDocument';
import AddImage from './questions/AddImage';
import AddVideo from './questions/AddVideo';

interface QuestionProps {
    questionIndex: number;
    sectionIndex: number;
    question: QuestionTypes;
}

const Question: React.FC<QuestionProps> = ({ questionIndex, question, sectionIndex }) => {

    const renderInput = () => {
        switch (question.type) {
            case 'Add Title':
                return (
                    <AddTittle sectionIndex={sectionIndex} questionIndex={questionIndex} question={question} key={question.id} />
                );
            case 'Add Description':
                return (
                    <AddDescription sectionIndex={sectionIndex} questionIndex={questionIndex} question={question} key={question.id} />
                );
            case 'Add URL':
                return (
                    <AddUrl sectionIndex={sectionIndex} questionIndex={questionIndex} question={question} key={question.id} />
                );
            case 'Add Document':
                return (
                    <AddDocument sectionIndex={sectionIndex} questionIndex={questionIndex} question={question} key={question.id} />
                );
            case 'Add Image':
                return (
                    <AddImage sectionIndex={sectionIndex} questionIndex={questionIndex} question={question} key={question.id} />
                );
            case 'Add Video':
                return (
                    <AddVideo sectionIndex={sectionIndex} questionIndex={questionIndex} question={question} key={question.id} />
                );
            case 'Short Text':
                return (
                    <ShortText question={question} sectionIndex={sectionIndex} questionIndex={questionIndex} key={question.id} />
                );
            case 'Paragraph':
                return (
                    <Paragraph question={question} sectionIndex={sectionIndex} questionIndex={questionIndex} key={question.id} />
                );
            case 'Dropdown':
                return (
                    <DropDown question={question} sectionIndex={sectionIndex} questionIndex={questionIndex} key={question.id} />
                );
            case 'Number':
                return (
                    <Number question={question} sectionIndex={sectionIndex} questionIndex={questionIndex} key={question.id} />
                );
            case 'Add Checkbox':
                return (
                    <div className='space-y-2'>
                        <label>{question.label}</label>
                        <input
                            type="checkbox"
                            checked={!!question.label}
                            className="border p-2"
                        />
                    </div>
                );
            case 'Upload':
                return (
                    <Upload question={question} sectionIndex={sectionIndex} questionIndex={questionIndex} />
                );
            case 'Date':
                return (
                    <div className='space-y-2'>
                        <label>{question.label}</label>
                        <input
                            type="date"
                            value={question.label || ''}
                            className="border p-2 w-full"
                        />

                    </div>
                );
            default:
                return null;
        }
    };

    return <div className="mb-4">{renderInput()}</div>;
};

export default Question;
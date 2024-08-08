import React from 'react';
import { useFormStore } from '@/store/form-design/formStore';
import Question from './Question';
import { QuestionTypes, SectionTypes } from '@/types';
import { Input } from '@/components/ui/input';
import SearchSection from './SearchSection';
import AddItem from './AddItem';
import { Icon } from '@iconify/react';

interface SectionProps {
    SectionIndex: number;
    section: SectionTypes;
    totalSections: number;
}

const Section: React.FC<SectionProps> = ({ SectionIndex, section, totalSections }) => {
    const { updateSection, addSection, splitSection, removeSection, removeQuestionFromSection } = useFormStore();

    const handleAddDocumentFromQuestion = (type: string, questionIndex: number) => {
        if (type === 'Add Section') {
            handleAddSectionFromQuestion(questionIndex);
        } else {
            const newQuestion: QuestionTypes = { id: `question-${Date.now()}`, type, title: '' };
            const updatedQuestions = [...section.questions];
            updatedQuestions.splice(questionIndex + 1, 0, newQuestion);
            updateSection(SectionIndex, { ...section, questions: updatedQuestions });
        }
    };

    const handleAddSectionFromQuestion = (questionIndex: number) => {
        const newSection: SectionTypes = { id: `section-${Date.now()}`, name: '', questions: section.questions.slice(questionIndex + 1) };

        const updatedCurrentSection = { ...section, questions: section.questions.slice(0, questionIndex +  1) };
        updateSection(SectionIndex, updatedCurrentSection);
        addSection(newSection, SectionIndex + 1);
    };

    const handleAddDocumentFromSection = (type: string) => {
        if (type === 'Add Section') {
            handleAddSectionFromSection();
        } else {
            const newQuestion: QuestionTypes = { id: `question-${Date.now()}`, type, title: '' };
            const updatedQuestions = [...section.questions];
            updatedQuestions.splice(0, 0, newQuestion);
            updateSection(SectionIndex, { ...section, questions: updatedQuestions });
        }
    };

    const handleAddSectionFromSection = () => {
        const newSection: SectionTypes = { id: `section-${Date.now()}`, name: '', questions: section.questions.slice(0) };
        const updatedCurrentSection = { ...section, questions: section.questions.slice(0 +  section.questions.length) };
        updateSection(SectionIndex, updatedCurrentSection);
        addSection(newSection, SectionIndex + 1);
    };

    const handleSelectNextSection = (value: string) => {
        updateSection(SectionIndex, { ...section, nextSection: value });
    };

    const handleRemoveSection = () => {
        removeSection(SectionIndex);
    };

    const handleRemoveQuestion = (questionIndex: number) => {
        removeQuestionFromSection(SectionIndex, questionIndex);
    };

    const questionOptions = [
        { title: 'Add Section', value: 'Add Section' },
        { title: 'Add Title', value: 'Add Title' },
        { title: 'Add Description', value: 'Add Description' },
        { title: 'Add URL', value: 'Add URL' },
        { title: 'Add Document', value: 'Add Document' },
        { title: 'Add Image', value: 'Add Image' },
        { title: 'Add Video', value: 'Add Video' },
        { title: 'Short Text', value: 'Short Text' },
        { title: 'Paragraph', value: 'Paragraph' },
        { title: 'Number', value: 'Number' },
        { title: 'Checkbox', value: 'Checkbox' },
        { title: 'Dropdown', value: 'Dropdown' },
        { title: 'Upload', value: 'Upload' },
        { title: 'Date', value: 'Date' },
        { title: 'Signature', value: 'Signature' },
        { title: 'Add Calculation', value: 'Add Calculation' },
        { title: 'Add To Database', value: 'Add To Database' },
        { title: 'Add QR Code', value: 'Add QR Code' },
    ];

    const sectionOptions = Array.from({ length: totalSections }, (_, i) => ({
        title: `Section ${i + 1}`,
        value: `section-${i + 1}`
    }));

    return (
        <div className="mb-4 rounded-lg">
            <div className='space-y-3 bg-white shadow-sm'>
                <div className='p-4 border-b flex justify-between items-center bg-green-700 text-white'>
                    <h2 className="text-lg font-medium pl-[1px]">{`Section ${SectionIndex + 1} out of ${totalSections}`}</h2>
                    <button onClick={handleRemoveSection} className="text-white text-2xl">
                        <Icon icon="ic:outline-delete" />
                    </button>
                </div>
                <div className='p-4 border-b'>
                    <div className='flex items-center space-x-4 mb-4'>
                        <label htmlFor="section-name" className='whitespace-nowrap'>Section Name:</label>
                        <Input
                            placeholder="Section Name"
                            value={section.name}
                            onChange={(e) => updateSection(SectionIndex, { ...section, name: e.target.value })}
                            id='section-name'
                            className="w-full focus-visible:ring-0 border focus:border-primary"
                        />
                    </div>
                    <div className='flex items-center space-x-6 mb-4'>
                        <label htmlFor="next-section" className='whitespace-nowrap'>Next Section:</label>
                        <SearchSection options={sectionOptions} onSelect={handleSelectNextSection} />
                    </div>
                    <div className=''>
                        <AddItem options={questionOptions} onSelect={(type) => handleAddDocumentFromSection(type)} />
                    </div>
                </div>
            </div>
            <div className='py-4 space-y-6'>
                {section.questions.map((question, i) => (
                    <div className='p-4 border-b bg-white shadow-sm' key={question.id}>
                        <div className="w-full mb-4">
                            <div className="flex justify-between">
                                <h3 className="font-semibold">{question.type}</h3>
                                <button onClick={() => handleRemoveQuestion(i)} className="text-red-500 text-2xl">
                                    <Icon icon="ic:outline-delete" />
                                </button>
                            </div>
                            <Question sectionIndex={SectionIndex} questionIndex={i} question={question} />
                        </div>
                        <AddItem options={questionOptions} onSelect={(type) => handleAddDocumentFromQuestion(type, i)} />
                    </div>
                ))}
            </div>
        </div> 
    );
};

export default Section;
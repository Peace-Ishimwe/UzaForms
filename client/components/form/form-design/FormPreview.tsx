import React, { useState } from 'react';
import { createFormStore } from '@/store/form-design/formStore'
import QuestionPreview from './QuestionPreview';
import { useParams } from 'next/navigation';

const FormPreview: React.FC = () => {
  const params = useParams()
  const formId = params?.formId as string
  const { sections } = createFormStore(formId)();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [nextSectionId, setNextSectionId] = useState<string | null>(null);

  const currentSection = sections[currentSectionIndex];

  const handleNextSection = () => {
    if (nextSectionId) {
      const nextIndex = sections.findIndex(section => section.id === nextSectionId);
      if (nextIndex !== -1) {
        setCurrentSectionIndex(nextIndex);
        setNextSectionId(null);
      }
    } else {
      setCurrentSectionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleDropdownChange = (questionId: string, selectedOptionIndex: number) => {
    const dropdownQuestion = currentSection.questions.find(q => q.id === questionId);

    if (dropdownQuestion && dropdownQuestion.nextSections) {
      const nextSections = dropdownQuestion.nextSections as Record<string, string>;
      const nextSectionId = nextSections[selectedOptionIndex.toString()];

      if (nextSectionId) {
        setNextSectionId(nextSectionId);
      }
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Form Preview</h1>
      {currentSection ? (
        <div key={currentSection.id} className="mb-4 p-4 border rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-medium mb-4">
            {currentSection.name || `Section ${currentSectionIndex + 1}`}
          </h2>
          {currentSection.questions.map((question, i) => (
            <QuestionPreview
              key={question.id}
              question={question}
              questionIndex={i}
              sectionIndex={currentSectionIndex}
              onDropdownChange={handleDropdownChange}
            />
          ))}
          {currentSectionIndex < sections.length - 1 && (
            <button
              onClick={handleNextSection}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next Section
            </button>
          )}
        </div>
      ) : (
        <p>No sections to preview.</p>
      )}
    </div>
  );
};

export default FormPreview;

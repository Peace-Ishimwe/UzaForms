import React, { useEffect } from 'react';
import { useFormStore } from '@/store/form-desgn/formStore';
import Section from './Section';

const FormWorkFlow: React.FC = () => {
  const { sections, addSection, initializeForm } = useFormStore();
  console.log(sections);
  

  useEffect(() => {
    if (sections.length === 0) {
      initializeForm();
    }
  }, [sections, initializeForm]);

  return (
    <div className="">
      {sections.map((section, index) => (
        <Section key={index} SectionIndex={index} section={section} totalSections={sections.length} />
      ))}
    </div>
  );
};

export default FormWorkFlow;

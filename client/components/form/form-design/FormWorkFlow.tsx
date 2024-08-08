import React, { FormEvent, useEffect, useState } from 'react';
import { useFormStore } from '@/store/form-design/formStore';
import Section from './Section';
import { toast } from 'react-toastify';
import { useCreateFormDesign } from '@/hooks/form/useFormDesign';
import { useRouter } from 'next/navigation';

const FormWorkFlow: React.FC = () => {
  const { sections, formId, initializeForm } = useFormStore();
  const createFormDesignMutation = useCreateFormDesign();
  const router = useRouter()

  const validateForm = (): boolean => {
    let isValid = true;
    if (!formId) {
      toast.error('Select the form name');
      isValid = false;
    }

    sections.forEach((section, index) => {
      if (!section.name) {
        toast.error(`Section ${index + 1} must have a name`);
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      const data = await createFormDesignMutation.mutateAsync({ formId, sections });
      if (data.success) {
        toast.success(data.message);
        initializeForm();
        router.push('/dashboard/form/names')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Saving form failed!');
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {sections.map((section, index) => (
        <Section
          key={index}
          SectionIndex={index}
          section={section}
          totalSections={sections.length}
        />
      ))}
      <div className="w-full flex justify-center">
        <button type="submit" className="bg-primary py-2 px-4 mx-auto rounded-md text-white">
          {createFormDesignMutation.isPending ? (
            <p>Saving form...</p>
          ) : (
            <p>Save Form</p>
          )}
        </button>
      </div>
    </form>
  );
};

export default FormWorkFlow;
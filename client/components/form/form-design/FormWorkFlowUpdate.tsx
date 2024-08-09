import React, { FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createFormStore } from '@/store/form-design/formStore';
import Section from './Section';
import { toast } from 'react-toastify';
import { useUpdateFormDesign } from '@/hooks/form/useFormDesign';
import { ToastContainer } from 'react-toastify';

const FormUpdateWorkFlow: React.FC = () => {
    const params = useParams()
    const formId = params?.formId as string
    const { sections, updateSection, initializeForm } = createFormStore(formId)();
    const updateFormDesignMutation = useUpdateFormDesign();
    const router = useRouter();

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
            const updatePayload = { formId: formId as string, formDesignData: { formId, sections } };
            const response = await updateFormDesignMutation.mutateAsync(updatePayload);
            if (response.success == true) {
                toast.success(response.message);
                initializeForm();
                router.push('/dashboard/form/names');
            } else {
                toast.error('Updating form failed');
            }
        } catch (error) {
            console.error(error);
            toast.error('Saving form failed!');
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
                    {updateFormDesignMutation.isPending ? (
                        <p>Updating form...</p>
                    ) : (
                        <p>Update Form</p>
                    )}
                </button>
            </div>
            <ToastContainer />
        </form>
    );
};

export default FormUpdateWorkFlow;

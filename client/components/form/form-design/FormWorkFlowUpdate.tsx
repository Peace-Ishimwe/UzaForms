import React, { useEffect, useState, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useFormStore } from '@/store/form-design/formStore';
import Section from './Section';
import { toast } from 'react-toastify';
import { useGetFormDesignById, useUpdateFormDesign } from '@/hooks/form/useFormDesign';
import { ToastContainer } from 'react-toastify';

const FormUpdateWorkFlow: React.FC = () => {
    const { sections, formId, initializeForm, setSections, setFormId } = useFormStore();
    const updateFormDesignMutation = useUpdateFormDesign();
    const router = useRouter();

    const { data, isLoading } = useGetFormDesignById(formId);

    useEffect(() => {
        if (data) {
            const { formId, sections} = data;
            setFormId(formId);
            setSections(sections);
        }
    }, [data, setFormId, setSections]);

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
            const updatePayload = { _id: formId as string, formDesignData: { formId, sections } };
            const response = await updateFormDesignMutation.mutateAsync(updatePayload);
            if (response.success) {
                toast.success('Form updated successfully!');
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

    if (isLoading) {
        return <p>Loading...</p>;
    }

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

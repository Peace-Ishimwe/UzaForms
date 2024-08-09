import React, { useState } from 'react';
import { QuestionTypes } from '@/types';
import { createFormStore } from '@/store/form-design/formStore';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';

interface Props {
    question: QuestionTypes;
    questionIndex: number;
    sectionIndex: number;
}

const AddDocument: React.FC<Props> = ({ question, questionIndex, sectionIndex }) => {
    const params = useParams()
    const formId = params?.formId as string
    const { sections, updateSection } = createFormStore(formId)();
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const uploadDocument = async (formData: FormData) => {
        try {
            setIsUploading(true);
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const responseData = await response.json();
            if (responseData.status === 201) {
                const updatedQuestion = { ...question, document: responseData.filename };
                const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
                updatedSection.questions[questionIndex] = updatedQuestion;
                updateSection(sectionIndex, updatedSection);
                toast.success('Document uploaded successfully!');
            } else {
                toast.error('Uploading document failed');
            }
        } catch (error) {
            console.error('Upload error', error);
            toast.error('Uploading document failed');
        } finally {
            setIsUploading(false);
        }
    };

    const deleteDocument = async (fileName: string) => {
        try {
            setIsDeleting(true);
            const response = await fetch('/api/upload', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fileName }),
            });
            const responseData = await response.json();
            if (responseData.success) {
                const updatedQuestion = { ...question, document: '' };
                const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
                updatedSection.questions[questionIndex] = updatedQuestion;
                updateSection(sectionIndex, updatedSection);
                toast.success('Document deleted successfully!');
            } else {
                toast.error('Deleting document failed');
            }
        } catch (error) {
            console.error('Delete error', error);
            toast.error('Deleting document failed');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const formData = new FormData();
            formData.append('file', selectedFile);

            uploadDocument(formData);
        }
    };

    const handleDeleteClick = () => {
        if (question.document) {
            deleteDocument(question.document);
        }
    };

    return (
        <div className="space-y-6">
            <div className="py-2 border-b -mx-4"></div>
            <div className="flex space-x-4 items-center">
                <p className="whitespace-nowrap">Add Document: </p>
                <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    className="border p-2 w-full"
                    onChange={handleChange}
                    disabled={isUploading || isDeleting}
                />
                {(isUploading || isDeleting) && <p>Loading...</p>}
                {question.document && (
                    <button
                        onClick={handleDeleteClick}
                        className="bg-red-500 text-white p-2 rounded"
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddDocument;
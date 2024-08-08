import React, { useState } from 'react';
import { QuestionTypes } from '@/types';
import { useFormStore } from '@/store/form-design/formStore';
import { toast } from 'react-toastify';

interface Props {
    question: QuestionTypes;
    questionIndex: number;
    sectionIndex: number;
}

const AddImage: React.FC<Props> = ({ question, questionIndex, sectionIndex }) => {
    const { sections, updateSection } = useFormStore();
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const uploadImage = async (formData: FormData) => {
        try {
            setIsUploading(true);
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const responseData = await response.json();
            const updatedQuestion = { ...question, image: responseData.filename };
            const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
            updatedSection.questions[questionIndex] = updatedQuestion;
            updateSection(sectionIndex, updatedSection);
            toast.success('Image uploaded successfully!');
        } catch (error) {
            console.error('Upload error', error);
            toast.error('Uploading image failed');
        } finally {
            setIsUploading(false);
        }
    };

    const deleteImage = async (fileName: string) => {
        try {
            setIsDeleting(true);
            const response = await fetch('/api/upload', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fileName }),
            });
            if (response.ok) {
                const updatedQuestion = { ...question, image: '' };
                const updatedSection = { ...sections[sectionIndex], questions: [...sections[sectionIndex].questions] };
                updatedSection.questions[questionIndex] = updatedQuestion;
                updateSection(sectionIndex, updatedSection);
                toast.success('Image deleted successfully!');
            } else {
                throw new Error('Delete request failed');
            }
        } catch (error) {
            console.error('Delete error', error);
            toast.error('Deleting image failed');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const formData = new FormData();
            formData.append('file', selectedFile);
            uploadImage(formData);
        }
    };

    const handleDeleteClick = () => {
        if (question.image) {
            deleteImage(question.image);
        }
    };

    return (
        <div className="space-y-6">
            <div className="py-2 border-b -mx-4"></div>
            <div className="flex space-x-4 items-center">
                <p className="whitespace-nowrap">Add Image: </p>
                <input
                    type="file"
                    name="formData"
                    accept="image/*"
                    className="border p-2 w-full"
                    onChange={handleChange}
                    disabled={isUploading || isDeleting}
                />
                {(isUploading || isDeleting) && <p>Loading...</p>}
                {question.image && (
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

export default AddImage;
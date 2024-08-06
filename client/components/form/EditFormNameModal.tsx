import { useUpdateFormName } from '@/hooks/form/useFormNames';
import React, { useState, FormEvent, SetStateAction } from 'react';
import { toast } from 'react-toastify';

interface EditFormNameDialogProps {
    isOpen: boolean;
    onClose: () => void;
    formName: FormName | null;
    setSelectedFn: React.Dispatch<SetStateAction<any>>;
}

interface FormName {
    _id?: string;
    formName: string;
    status: string;
}

export const EditFormNameModal: React.FC<EditFormNameDialogProps> = ({ isOpen, onClose, formName, setSelectedFn }) => {
    const [formData, setFormData] = useState<FormName>({
        _id: formName?._id,
        formName: formName?.formName || '',
        status: formName?.status || '',
    });

    const updateFormNameMutation = useUpdateFormName();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = await updateFormNameMutation.mutateAsync({ _id: formData._id, formData });
            if (data.success) {
                setSelectedFn(null);
                toast.success(data.message);
                onClose();
            }
        } catch (error) {
            console.error(error);
            toast.error('Updating form name failed');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">Edit Form Name</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Form Name</label>
                        <input
                            type="text"
                            name="formName"
                            value={formData.formName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        >
                            <option value="ENABLED">ENABLED</option>
                            <option value="DISABLED">DISABLED</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
import React, { FormEvent, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useCreateFormAndRole } from '@/hooks/form/useFormAndRole';
import SearchRole from '../Settings/SearchRole';
import SearchForm from './SearchForm';
import { toast } from 'react-toastify';

const FormRoleAddModal: React.FC = () => {
    const [formNameId, setFormId] = useState('')
    const [roleId, setRoleId] = useState('')
    
    const createRoleAndFormMutation = useCreateFormAndRole()
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const data = await createRoleAndFormMutation.mutateAsync({ formNameId, roleId })
            if (data.success == true) {
                toast.success(data.message)
                setIsAddModalOpen(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Role creation failed')
        }
    }

    return (
        <div>
            <button
                onClick={openAddModal}
                className='text-white bg-primary px-4 py-2 rounded-lg'
            >
                Add New Form/Role
            </button>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                    <button type="button" onClick={closeAddModal} className="absolute top-0 right-0 mt-2 mr-2 text-gray-500">
                        &times;
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Form/Role</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Form</label>
                            <SearchForm setFormId={setFormId} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <SearchRole setRoleId={setRoleId} />
                        </div>
                        <button
                            type="submit"
                            className="mt-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
                        >
                            {
                                createRoleAndFormMutation.isPending ? (
                                    <p>Creating...</p>
                                ) : (
                                    <p>Add</p>
                                )
                            }
                        </button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FormRoleAddModal;
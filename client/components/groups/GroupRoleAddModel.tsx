import React, { FormEvent, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useCreateGroupAndRole } from '@/hooks/useGroupAndRole';
import SearchRole from '../Settings/SearchRole';
import SearchGroup from './SearchGroup';
import { toast } from 'react-toastify';

const GroupRoleAddModal: React.FC = () => {
    const [groupNameId, setGroupId] = useState('')
    const [roleId, setRoleId] = useState('')

    const createRoleAndGroupMutation = useCreateGroupAndRole()
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
            const data = await createRoleAndGroupMutation.mutateAsync({ groupNameId, roleId })
            if (data.success == true) {
                toast.success(data.message)
                setIsAddModalOpen(false)
            }else{
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
                Add New Group/Role
            </button>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                    <button type="button" onClick={closeAddModal} className="absolute top-0 right-0 mt-2 mr-2 text-gray-500">
                        &times;
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Group/Role</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <SearchGroup setGroupId={setGroupId} />
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
                                createRoleAndGroupMutation.isPending ? (
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

export default GroupRoleAddModal;
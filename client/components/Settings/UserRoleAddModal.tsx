import React, { FormEvent, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useCreateUserAndRole } from '@/hooks/useUserAndRole';
import SearchUser from './SearchUser';
import SearchRole from './SearchRole';
import { toast } from 'react-toastify';

const UserRoleAddModal: React.FC = () => {
    const [userId, setUserId] = useState('')
    const [roleId, setRoleId] = useState('')
    console.log(userId, roleId);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const createRoleAndModalMutation = useCreateUserAndRole()

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const data = await createRoleAndModalMutation.mutateAsync({ userId, roleId })
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
                Add New User/Role
            </button>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                    <button type="button" onClick={closeAddModal} className="absolute top-0 right-0 mt-2 mr-2 text-gray-500">
                        &times;
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New User/Role</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <SearchUser setUserId={setUserId} />
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
                                createRoleAndModalMutation.isPending ? (
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

export default UserRoleAddModal;
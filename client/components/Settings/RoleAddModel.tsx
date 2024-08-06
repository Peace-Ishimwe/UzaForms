import React, { FormEvent, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useCreateRole } from '@/hooks/useRole';
import { toast } from 'react-toastify';

interface UserRoleData {
    roleName: string;
    roleDescription: string;
    status: 'ENABLED' | 'DISABLED';
    createdAt?: Date;
    updatedAt?: Date;
}

const RoleAddModal: React.FC = () => {
    const [userRoleData, setUserRoleData] = useState<UserRoleData>({
        roleName: '',
        roleDescription: '',
        status: 'ENABLED',
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const createRoleMutation = useCreateRole()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserRoleData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const data = await createRoleMutation.mutateAsync(userRoleData)
            if (data.success == true) {
                toast.success('Role created successfully')
                setIsAddModalOpen(false)
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
                Add New Role
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
                            <label className="block text-sm font-medium text-gray-700">Role Name</label>
                            <input
                                name="roleName"
                                onChange={handleInputChange}
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Role Description</label>
                            <input
                                name="roleDescription"
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                type='text'
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
                        >
                            {
                                createRoleMutation.isPending ? (
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

export default RoleAddModal;
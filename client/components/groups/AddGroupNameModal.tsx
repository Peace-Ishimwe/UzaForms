import React, { useState, FormEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { toast } from 'react-toastify';
import { useCreateGroupName } from '@/hooks/useGroupNames';
import { useAuthStore } from '@/store/useAuthStore';
import { roleStore } from '@/store/roleStore';

interface GroupName {
    groupName: string;
    status: string;
    createdBy: string;
    roles: string[];
}

export const AddGroupNameModal: React.FC = () => {
    const { user } = useAuthStore();
    const { roles } = roleStore();
    const [formData, setFormData] = useState<GroupName>({
        groupName: '',
        status: '',
        createdBy: user ? user._id : '',
        roles: [],
    });

    console.log(formData)

    const createGroupNameMutation = useCreateGroupName();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            roles: checked
                ? [...prev.roles, value]
                : prev.roles.filter((role) => role !== value),
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = await createGroupNameMutation.mutateAsync(formData);
            if (data.success) {
                toast.success(data.message);
                setIsAddModalOpen(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to add group name');
        }
    };

    return (
        <div>
            <button
                onClick={openAddModal}
                className='text-white bg-primary px-4 py-2 rounded-lg'
            >
                Add Group Name
            </button>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                    <button type="button" onClick={closeAddModal} className="absolute top-0 right-0 mt-2 mr-2 text-gray-500">
                        &times;
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Group Name</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Group Name</label>
                            <input
                                type="text"
                                name="groupName"
                                value={formData.groupName}
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
                                <option value="">Select Status</option>
                                <option value="ENABLED">ENABLED</option>
                                <option value="DISABLED">DISABLED</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Roles</label>
                            <div className="space-y-2">
                                {roles && roles.map((role: any) => (
                                    <div key={role._id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`role-${role._id}`}
                                            value={role._id}
                                            checked={formData.roles.includes(role._id)}
                                            onChange={handleRoleChange}
                                            className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                        />
                                        <label htmlFor={`role-${role._id}`} className="text-sm text-gray-700">
                                            {role.roleName}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={closeAddModal}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="bg-primary text-white px-4 py-2 rounded-md"
                            >
                                {
                                    createGroupNameMutation.isPending ? (
                                        <p>Creating...</p>
                                    ) : (
                                        <p>Add</p>
                                    )
                                }
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
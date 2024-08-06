import React, { useState } from 'react';
import UserEditModal from './UserEditModal';
import { Icon } from '@iconify/react';
import { userStore } from '@/store/userStore';

interface UserData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: 'ENABLED' | 'DISABLED';
    createdAt?: string;
    updatedAt?: string;
}

const UsersTable: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    const { users } = userStore()
    const openModal = (user: UserData) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-primary text-white uppercase text-sm leading-normal">
                    <tr>
                        <th className="py-3 px-6 text-left normal-case">First Name</th>
                        <th className="py-3 px-6 text-left normal-case">Last Name</th>
                        <th className="py-3 px-6 text-left normal-case">Email</th>
                        <th className="py-3 px-6 text-left normal-case">Status</th>
                        <th className="py-3 px-6 text-left normal-case">Created At</th>
                        <th className="py-3 px-6 text-left normal-case">Updated At</th>
                        <th className="py-3 px-6 text-left normal-case">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {users && users.map((user: UserData, index: number) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{user.firstName}</td>
                            <td className="py-3 px-6 text-left">{user.lastName}</td>
                            <td className="py-3 px-6 text-left">{user.email}</td>
                            <td className="py-3 px-6 text-left">{user.status}</td>
                            <td className="py-3 px-6 text-left">{user.createdAt}</td>
                            <td className="py-3 px-6 text-left">{user.updatedAt}</td>
                            <td className="py-3 px-6 text-left">
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => openModal(user)}
                                >
                                    <Icon icon="ic:baseline-edit" fontSize={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedUser && (
                <UserEditModal isOpen={isModalOpen} closeModal={closeModal} user={selectedUser} />
            )}
        </div>
    );
};

export default UsersTable;

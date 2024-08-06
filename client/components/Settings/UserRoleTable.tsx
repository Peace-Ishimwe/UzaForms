import React, { useState } from 'react';
import UserRoleEditModal from './UserRoleEditModal';
import { Icon } from '@iconify/react';
import { userAndRoleStore } from '@/store/userAndRoleStore';

interface UserRoleData {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}

const UserRoleTable: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserRole, setSelectedUserRole] = useState<UserRoleData | null>(null);
    const { usersAndRoles } = userAndRoleStore()

    const openModal = (userRole: UserRoleData) => {
        setSelectedUserRole(userRole);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUserRole(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-primary text-white uppercase text-sm leading-normal">
                    <tr>
                        <th className="py-3 px-6 text-left normal-case">First Name</th>
                        <th className="py-3 px-6 text-left normal-case">Last Name</th>
                        <th className="py-3 px-6 text-left normal-case">Email</th>
                        <th className="py-3 px-6 text-left normal-case">Role</th>
                        <th className="py-3 px-6 text-left normal-case">Created At</th>
                        <th className="py-3 px-6 text-left normal-case">Updated At</th>
                        <th className="py-3 px-6 text-left normal-case">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {usersAndRoles && usersAndRoles.map((userRole: UserRoleData, index: number) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{userRole.firstName}</td>
                            <td className="py-3 px-6 text-left">{userRole.lastName}</td>
                            <td className="py-3 px-6 text-left">{userRole.email}</td>
                            <td className="py-3 px-6 text-left">{userRole.role}</td>
                            <td className="py-3 px-6 text-left">{userRole.createdAt}</td>
                            <td className="py-3 px-6 text-left">{userRole.updatedAt}</td>
                            <td className="py-3 px-6 text-left">
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => openModal(userRole)}
                                >
                                    <Icon icon="ic:baseline-edit" fontSize={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedUserRole && (
                <UserRoleEditModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    userRole={selectedUserRole}
                />
            )}
        </div>
    );
};

export default UserRoleTable;

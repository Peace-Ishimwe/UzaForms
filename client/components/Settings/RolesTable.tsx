import React, { useState } from 'react';
import RoleEditModal from './RoleEditModal';
import { Icon } from '@iconify/react';
import { roleStore } from '@/store/roleStore';

interface RoleData {
    _id: string;
    roleName: string;
    roleDescription: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const RolesTable: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);
    const { roles } = roleStore()

    const openModal = (role: RoleData) => {
        setSelectedRole(role);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRole(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-primary text-white uppercase text-sm leading-normal">
                    <tr>
                        <th className="py-3 px-6 text-left">Role Name</th>
                        <th className="py-3 px-6 text-left">Role Description</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-left">Created At</th>
                        <th className="py-3 px-6 text-left">Updated At</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {roles && roles.map((role: any, index: any) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{role.roleName}</td>
                            <td className="py-3 px-6 text-left">{role.roleDescription}</td>
                            <td className="py-3 px-6 text-left">{role.status}</td>
                            <td className="py-3 px-6 text-left">{role.createdAt}</td>
                            <td className="py-3 px-6 text-left">{role.updatedAt}</td>
                            <td className="py-3 px-6 text-left">
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => openModal(role)}
                                >
                                    <Icon icon="ic:baseline-edit" fontSize={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedRole && (
                <RoleEditModal isOpen={isModalOpen} closeModal={closeModal} role={selectedRole} />
            )}
        </div>
    );
};

export default RolesTable;
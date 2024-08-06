import React, { useState } from 'react';
import GroupRoleEditModal from './GroupRoleEditModal';
import { Icon } from '@iconify/react';
import { GroupAndRoleStore } from '@/store/groupAndRoleStore';

interface GroupRoleData {
    _id: string;
    groupName: string;
    roleName: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

const GroupRoleTable: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedgroupRole, setSelectedgroupRole] = useState<GroupRoleData | null>(null);
    const { groupAndRoles } = GroupAndRoleStore()
    console.log(groupAndRoles)    

    const openModal = (groupRole: GroupRoleData) => {
        setSelectedgroupRole(groupRole);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedgroupRole(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-primary text-white uppercase text-sm leading-normal">
                    <tr>
                        <th className="py-3 px-6 text-left normal-case">Group Name</th>
                        <th className="py-3 px-6 text-left normal-case">Role Name</th>
                        <th className="py-3 px-6 text-left normal-case">Status</th>
                        <th className="py-3 px-6 text-left normal-case">Create At</th>
                        <th className="py-3 px-6 text-left normal-case">Updated At</th>
                        <th className="py-3 px-6 text-left normal-case">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {groupAndRoles && groupAndRoles.data.map((groupRole: GroupRoleData, index: number) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{groupRole.groupName}</td>
                            <td className="py-3 px-6 text-left">{groupRole.roleName}</td>
                            <td className="py-3 px-6 text-left">{groupRole.status}</td>
                            <td className="py-3 px-6 text-left">{groupRole.createdAt}</td>
                            <td className="py-3 px-6 text-left">{groupRole.updatedAt}</td>
                            <td className="py-3 px-6 text-left">
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => openModal(groupRole)}
                                >
                                    <Icon icon="ic:baseline-edit" fontSize={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedgroupRole && (
                <GroupRoleEditModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    GroupRole={selectedgroupRole}
                />
            )}
        </div>
    );
};

export default GroupRoleTable;
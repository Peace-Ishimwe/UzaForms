import React, { useState } from 'react';
import { EditGroupNameModal } from './EditGroupNameModal';
import { Icon } from '@iconify/react';
import { groupNamesStore } from '@/store/groupNamesStore';

interface GroupName {
    id: string;
    groupName: string;
    status: string;
    role: string;
    createdBy: {
        firstName: string;
        lastName: string;
    };
    createdAt: string;
    updatedAt: string;
}

const GroupNameTable: React.FC = () => {
    const { groupNames } = groupNamesStore();
    
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedGroupName, setSelectedGroupName] = useState<GroupName | null>(null);

    const handleAddOpen = () => setAddDialogOpen(true);
    const handleAddClose = () => setAddDialogOpen(false);

    const handleEditOpen = (groupName: GroupName) => {
        setSelectedGroupName(groupName);
        setEditDialogOpen(true);
    };
    const handleEditClose = () => setEditDialogOpen(false);

    return (
        <div className="">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className='bg-primary text-white uppercase text-sm leading-normal'>
                    <tr>
                        <th className="py-3 px-6 text-left normal-case">Group Name</th>
                        <th className="py-3 px-6 text-left normal-case">Status</th>
                        <th className="py-3 px-6 text-left normal-case">Created By</th>
                        <th className="py-3 px-6 text-left normal-case">Created At</th>
                        <th className="py-3 px-6 text-left normal-case">Updated At</th>
                        <th className="py-3 px-6 text-left normal-case">Actions</th>
                    </tr>
                </thead>
                <tbody className='text-gray-600 text-sm font-light'>
                    {groupNames && groupNames.data.map((gn: any) => (
                        <tr key={gn.id}>
                            <td className="py-3 px-6 text-left">{gn.groupName}</td>
                            <td className="py-3 px-6 text-left">{gn.status}</td>
                            <td className="py-3 px-6 text-left">{gn.createdBy.firstName} {gn.createdBy.lastName}</td>
                            <td className="py-3 px-6 text-left">{gn.createdAt}</td>
                            <td className="py-3 px-6 text-left">{gn.updatedAt}</td>
                            <td className="py-3 px-6 text-left">
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => handleEditOpen(gn)}
                                >
                                    <Icon icon="ic:baseline-edit" fontSize={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedGroupName && (
                <EditGroupNameModal 
                    isOpen={isEditDialogOpen} 
                    onClose={handleEditClose} 
                    groupName={selectedGroupName}
                    setSelectedGn={setSelectedGroupName}
                />
            )}
        </div>
    );
};

export default GroupNameTable;
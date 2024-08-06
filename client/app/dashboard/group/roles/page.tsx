"use client"
import React, { useEffect } from 'react';
import { useGetAllRoles } from '@/hooks/useRole';
import { roleStore } from '@/store/roleStore';
import { ToastContainer } from 'react-toastify';
import { GroupAndRoleStore } from '@/store/groupAndRoleStore';
import { useGetAllGroupAndRoles } from '@/hooks/useGroupAndRole';
import GroupRoleTable from '@/components/groups/GroupRoleTable';
import GroupRoleAddModal from '@/components/groups/GroupRoleAddModel';
import { useGetAllGroupNames } from '@/hooks/useGroupNames';
import { groupNamesStore } from '@/store/groupNamesStore';

const GroupAndRolesPage: React.FC = () => {
    const { setGroupAndRoles } = GroupAndRoleStore();
    const { setgroupNames } = groupNamesStore()
    const { setRoles } = roleStore()
    const { data, isPending } = useGetAllGroupAndRoles();
    const { data: groupData, isPending: isUserPending } = useGetAllGroupNames();
    const { data: roleData, isPending: isRolePending } = useGetAllRoles();

    useEffect(() => {
        if (data) {
            setGroupAndRoles(data);
            setgroupNames(groupData);
            setRoles(roleData)
        }
    }, [data]);
    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-semibold">Group Roles</h1>
            {isPending ? (
                <p className="h-full flex justify-center items-center">Fetching Group and Roles...</p>
            ) : (
                <div className="space-y-6">
                    <div className='flex justify-end'>
                        <GroupRoleAddModal />
                    </div>
                    <GroupRoleTable />
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default GroupAndRolesPage;
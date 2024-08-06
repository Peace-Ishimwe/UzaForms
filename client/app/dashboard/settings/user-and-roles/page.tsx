"use client"
import React, { useEffect } from 'react';
import UserRoleTable from '@/components/Settings/UserRoleTable';
import UserRoleAddModal from '@/components/Settings/UserRoleAddModal';
import { userAndRoleStore } from '@/store/userAndRoleStore';
import { useGetAllUserAndRoles } from '@/hooks/useUserAndRole';
import { useGetAllUsers } from '@/hooks/useUser';
import { useGetAllRoles } from '@/hooks/useRole';
import { userStore } from '@/store/userStore';
import { roleStore } from '@/store/roleStore';
import { ToastContainer } from 'react-toastify';

const UserAndRolesPage: React.FC = () => {
    const { setUsersAndRoles } = userAndRoleStore();
    const { setUsers } = userStore()
    const { setRoles } = roleStore()
    const { data, isPending } = useGetAllUserAndRoles();
    const { data: userData, isPending: isUserPending } = useGetAllUsers();
    const { data: roleData, isPending: isRolePending } = useGetAllRoles();

    useEffect(() => {
        if (data) {
            setUsersAndRoles(data.data);
            setUsers(userData);
            setRoles(roleData)
        }
    }, [data]);
    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-semibold">User Roles</h1>
            {isPending ? (
                <p className="h-full flex justify-center items-center">Fetching Users and Roles...</p>
            ) : (
                <div className="space-y-6">
                    <div className='flex justify-end'>
                        <UserRoleAddModal />
                    </div>
                    <UserRoleTable />
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default UserAndRolesPage;

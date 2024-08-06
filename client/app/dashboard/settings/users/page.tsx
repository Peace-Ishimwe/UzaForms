"use client"
import React, { useEffect } from 'react';
import UsersTable from '@/components/Settings/UsersTable';
import { userStore } from '@/store/userStore';
import { useGetAllUsers } from '@/hooks/useUser';
import { ToastContainer } from 'react-toastify';

const UsersPage: React.FC = () => {
  const { setUsers } = userStore();
  const { data, isPending } = useGetAllUsers();
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      {
        isPending ? (
          <p>Fetching users...</p>
        ) : (
          <UsersTable />
        )
      }
      <ToastContainer />
    </div>
  );
};

export default UsersPage;
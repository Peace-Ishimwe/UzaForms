"use client"
import { AddGroupNameModal } from '@/components/groups/AddGroupNameModal'
import GroupNameTable from '@/components/groups/GroupNamesTable'
import { useGetAllGroupNames } from '@/hooks/useGroupNames'
import { useGetAllRoles } from '@/hooks/useRole'
import { groupNamesStore } from '@/store/groupNamesStore'
import { roleStore } from '@/store/roleStore'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

const GroupNamesPage = () => {
  const { setgroupNames } = groupNamesStore();
  const { setRoles } = roleStore()
  const { data, isPending } = useGetAllGroupNames();
  const { data: roleData, isPending: isRolePending } = useGetAllRoles();

  useEffect(() => {
    if (data) {
      setgroupNames(data);
      setRoles(roleData)
    }
  }, [data]);

  return (
    <div className="p-4 space-y-6">
      <ToastContainer />
      <h1 className="text-2xl font-semibold">Roles</h1>
      {isPending ? (
        <p className="h-full flex justify-center items-center">Fetching Roles...</p>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-end">
            <AddGroupNameModal />
          </div>
          <GroupNameTable />
        </div>
      )}
    </div>
  )
}

export default GroupNamesPage
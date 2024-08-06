"use client"
import { AddFormNameModal } from '@/components/form/AddFormNameModal'
import FormNameTable from '@/components/form/FormNamesTable'
import { useGetAllFormNames } from '@/hooks/form/useFormNames'
import { useGetAllGroupNames } from '@/hooks/useGroupNames'
import { useGetAllRoles } from '@/hooks/useRole'
import { FormNamesStore } from '@/store/form/formNamesStore'
import { groupNamesStore } from '@/store/groupNamesStore'
import { roleStore } from '@/store/roleStore'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

const FormNamesPage = () => {
  const { setFormNames } = FormNamesStore();
  const { setgroupNames } = groupNamesStore();
  const { setRoles } = roleStore()
  const { data, isPending } = useGetAllFormNames()
  const { data: groupData } = useGetAllGroupNames();
  const { data: roleData, isPending: isRolePending } = useGetAllRoles();
  useEffect(() => {
    if (data) {
      setFormNames(data)
      setgroupNames(groupData);
      setRoles(roleData)
    }
  }, [data]);
  return (
    <div className="p-4 space-y-6">
      <ToastContainer />
      <h1 className="text-2xl font-semibold">Form Names</h1>
      {isPending ? (
        <p className="h-full flex justify-center items-center">Fetching form names...</p>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-end">
            <AddFormNameModal />
          </div>
          <FormNameTable />
        </div>
      )}
    </div>
  )
}

export default FormNamesPage
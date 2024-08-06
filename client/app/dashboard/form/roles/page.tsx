"use client"
import React, { useEffect } from 'react';
import { useGetAllRoles } from '@/hooks/useRole';
import { roleStore } from '@/store/roleStore';
import { ToastContainer } from 'react-toastify';
import { FormAndRoleStore } from '@/store/form/formAndRoleStore';
import { useGetAllFormAndRoles } from '@/hooks/form/useFormAndRole';
import FormRoleTable from '@/components/form/FormRoleTable';
import FormRoleAddModal from '@/components/form/FormRoleAddModel';
import { useGetAllFormNames } from '@/hooks/form/useFormNames';
import { FormNamesStore } from '@/store/form/formNamesStore';

const FormAndRolesPage: React.FC = () => {
    const { setFormAndRoles } = FormAndRoleStore();
    const { setFormNames } = FormNamesStore()
    const { setRoles } = roleStore()
    const { data, isPending } = useGetAllFormAndRoles();
    const { data: formData, isPending: isUserPending } = useGetAllFormNames();
    const { data: roleData, isPending: isRolePending } = useGetAllRoles();

    useEffect(() => {
        if (data) {
            setFormAndRoles(data);
            setFormNames(formData);
            setRoles(roleData)
        }
    }, [data]);
    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-semibold">Form Roles</h1>
            {isPending ? (
                <p className="h-full flex justify-center items-center">Fetching Form and Roles...</p>
            ) : (
                <div className="space-y-6">
                    <div className='flex justify-end'>
                        <FormRoleAddModal />
                    </div>
                    <FormRoleTable />
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default FormAndRolesPage;
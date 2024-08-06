"use client";
import React, { useEffect } from "react";
import RolesTable from "@/components/Settings/RolesTable";
import RoleAddModal from "@/components/Settings/RoleAddModel";
import { useGetAllRoles } from "@/hooks/useRole";
import { roleStore } from "@/store/roleStore";
import { ToastContainer } from "react-toastify";

const RolesPage: React.FC = () => {
    const { setRoles } = roleStore();
    const { data, isPending } = useGetAllRoles();
    useEffect(() => {
        if (data) {
            setRoles(data);
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
                        <RoleAddModal />
                    </div>
                    <RolesTable />
                </div>
            )}
        </div>
    );
};

export default RolesPage;

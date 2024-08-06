import React, { useState } from 'react';
import FormRoleEditModal from './FormRoleEditModal';
import { Icon } from '@iconify/react';
import { FormAndRoleStore } from '@/store/form/formAndRoleStore';

interface FormRoleData {
    _id: string;
    formName: string;
    roleName: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

const FormRoleTable: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFormRole, setSelectedFormRole] = useState<FormRoleData | null>(null);
    const { formAndRoles } = FormAndRoleStore();
    console.log(formAndRoles);

    const openModal = (formRole: FormRoleData) => {
        setSelectedFormRole(formRole);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFormRole(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-primary text-white uppercase text-sm leading-normal">
                    <tr>
                        <th className="py-3 px-6 text-left normal-case">Form Name</th>
                        <th className="py-3 px-6 text-left normal-case">Role Name</th>
                        <th className="py-3 px-6 text-left normal-case">Status</th>
                        <th className="py-3 px-6 text-left normal-case">Created At</th>
                        <th className="py-3 px-6 text-left normal-case">Updated At</th>
                        <th className="py-3 px-6 text-left normal-case">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {formAndRoles && formAndRoles.data.map((formRole: FormRoleData, index: number) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{formRole.formName}</td>
                            <td className="py-3 px-6 text-left">{formRole.roleName}</td>
                            <td className="py-3 px-6 text-left">{formRole.status}</td>
                            <td className="py-3 px-6 text-left">{formRole.createdAt}</td>
                            <td className="py-3 px-6 text-left">{formRole.updatedAt}</td>
                            <td className="py-3 px-6 text-left">
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => openModal(formRole)}
                                >
                                    <Icon icon="ic:baseline-edit" fontSize={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedFormRole && (
                <FormRoleEditModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    FormRole={selectedFormRole}
                />
            )}
        </div>
    );
};

export default FormRoleTable;
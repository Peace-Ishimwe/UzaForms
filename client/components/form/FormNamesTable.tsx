import React, { useState } from 'react';
import { EditFormNameModal } from './EditFormNameModal';
import { Icon } from '@iconify/react';
import { FormNamesStore } from '@/store/form/formNamesStore';
import Link from 'next/link';

interface FormName {
    id: string;
    formName: string;
    status: string;
    role: string;
    createdBy: {
        firstName: string;
        lastName: string;
    };
    createdAt: string;
    updatedAt: string;
}

const FormNameTable: React.FC = () => {
    const { formNames } = FormNamesStore();

    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedFormName, setSelectedFormName] = useState<FormName | null>(null);

    const handleAddOpen = () => setAddDialogOpen(true);
    const handleAddClose = () => setAddDialogOpen(false);

    const handleEditOpen = (formName: FormName) => {
        setSelectedFormName(formName);
        setEditDialogOpen(true);
    };
    const handleEditClose = () => setEditDialogOpen(false);

    return (
        <div className="">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className='bg-primary text-white uppercase text-sm leading-normal'>
                    <tr>
                        <th className="py-3 px-6 text-left normal-case">Form Name</th>
                        <th className="py-3 px-6 text-left normal-case">Group Name</th>
                        <th className="py-3 px-6 text-left normal-case">Status</th>
                        <th className="py-3 px-6 text-left normal-case">Created By</th>
                        <th className="py-3 px-6 text-left normal-case">Updated At</th>
                        <th className="py-3 px-6 text-left normal-case">Actions</th>
                    </tr>
                </thead>
                <tbody className='text-gray-600 text-sm font-light'>
                    {formNames && formNames.data.map((fn: any) => (
                        <tr key={fn._id}>
                            <td className="py-3 px-6 text-left">{fn.formName}</td>
                            <td className="py-3 px-6 text-left">{fn.groupName}</td>
                            <td className="py-3 px-6 text-left">{fn.status}</td>
                            <td className="py-3 px-6 text-left">{fn.createdBy.firstName} {fn.createdBy.lastName}</td>
                            <td className="py-3 px-6 text-left">{fn.updatedAt}</td>
                            <td className="py-3 px-6 text-left flex space-x-3">
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => handleEditOpen(fn)}
                                >
                                    <Icon icon="ic:baseline-edit" fontSize={18} />
                                </button>
                                {
                                    fn.formCreated ? (
                                        <Link href={`/dashboard/form/update/${fn._id}`} className="text-blue-600 hover:text-blue-800">
                                            <Icon icon="mdi:file-document-edit" fontSize={18} />
                                        </Link>
                                    ) : (
                                        <Link href={`/dashboard/form/create/${fn._id}`} className="text-blue-600 hover:text-blue-800">
                                            <Icon icon="gridicons:create" fontSize={18} />
                                        </Link>
                                    )
                                }
                                {
                                    fn.formCreated && (
                                        <Link href={`/dashboard/form/preview/${fn._id}`} className="text-blue-600 hover:text-blue-800">
                                            <Icon icon="icon-park-solid:preview-open" fontSize={18} />
                                        </Link>
                                    )
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedFormName && (
                <EditFormNameModal
                    isOpen={isEditDialogOpen}
                    onClose={handleEditClose}
                    formName={selectedFormName}
                    setSelectedFn={setSelectedFormName}
                />
            )}
        </div>
    );
};

export default FormNameTable;
import React, { FormEvent, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useUpdateRole } from '@/hooks/useRole';
import { toast } from 'react-toastify';

interface RoleEditModalProps {
  isOpen: boolean;
  closeModal: () => void;
  role: RoleData;
}

interface RoleData {
  _id: string;
  roleName: string;
  roleDescription: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const RoleEditModal: React.FC<RoleEditModalProps> = ({ isOpen, closeModal, role }) => {
  const [roleData, setRoleData] = useState<RoleData>(role);
  const roleUpdateMutation = useUpdateRole()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const data = await roleUpdateMutation.mutateAsync({ _id: roleData._id, formData: roleData })
      if (data.success == true) {
        toast.success('Role updated successfully')
        closeModal()
      }
    } catch (error) {
      console.log(error)
      toast.error('Updating role failed')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Role Name</label>
            <input
              name="roleName"
              value={roleData.roleName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Role Description</label>
            <input
              name="roleDescription"
              value={roleData.roleDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={roleData.status}
              onChange={(e) => handleInputChange(e as any)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="ENABLED">ENABLED</option>
              <option value="DISABLED">DISABLED</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
          >
            {
              roleUpdateMutation.isPending ? (
                <p>Saving...</p>
              ) : (
                <p>Save</p>
              )
            }
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RoleEditModal;
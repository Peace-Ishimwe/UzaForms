import React, { FormEvent, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import { useUpdateGroupAndRole } from '@/hooks/useGroupAndRole';

interface GroupRoleEditModalProps {
  isOpen: boolean;
  closeModal: () => void;
  GroupRole: GroupRoleData;
}

interface GroupRoleData {
    _id: string;
    groupName: string;
    roleName: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

const GroupRoleEditModal: React.FC<GroupRoleEditModalProps> = ({ isOpen, closeModal, GroupRole }) => {
  const [GroupRoleData, setGroupRoleData] = useState<GroupRoleData>(GroupRole);
  const updateGroupRoleMutation = useUpdateGroupAndRole()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGroupRoleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const data = await updateGroupRoleMutation.mutateAsync({ _id: GroupRoleData._id, formData: GroupRoleData })
      closeModal()
      toast.success(data.message)
    } catch (error) {
      console.log(error)
      toast.error('Updating role failed!')
      closeModal()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Group/Role</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Group Name</label>
            <input
              name="groupName"
              value={GroupRoleData.groupName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Role Name</label>
            <input
              name="roleName"
              value={GroupRoleData.roleName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={GroupRoleData.status}
              onChange={handleInputChange}
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
              updateGroupRoleMutation.isPending ? (
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

export default GroupRoleEditModal;
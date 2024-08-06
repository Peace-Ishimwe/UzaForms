"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authorizedAPI, unauthorizedAPI } from "@/utils/api";
import handleApiRequest from '@/utils/handleApiRequest';

interface GroupAndRoleParams {
    _id?: string;
    formData?: any;
}
const getAllGroupAndRoles = (): Promise<any> => {
    return handleApiRequest(() => unauthorizedAPI.get('/group-and-roles'));
};
const updateGroupAndRole = ({ formData, _id }: GroupAndRoleParams): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.put(`/group-and-roles/${_id}`, formData));
};

const createGroupAndRole = ({ groupNameId, roleId }: { groupNameId: string, roleId: string }): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.post('/group-and-roles', { groupNameId, roleId }));
};

export const useGetAllGroupAndRoles = () => useQuery<any, Error>({ queryKey: ["group-and-roles"], queryFn: getAllGroupAndRoles });

export const useUpdateGroupAndRole = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, GroupAndRoleParams>({
        mutationFn: updateGroupAndRole, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['group-and-roles'] })
        },
    })
}
export const useCreateGroupAndRole = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, any>({
        mutationFn: createGroupAndRole, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['group-and-roles'] })
        },
    })
}
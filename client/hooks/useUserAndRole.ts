"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authorizedAPI, unauthorizedAPI } from "@/utils/api";
import handleApiRequest from '@/utils/handleApiRequest';

interface UserAndRoleParams {
    _id?: string;
    formData?: any;
}
const getAllUserAndRoles = (): Promise<any> => {
    return handleApiRequest(() => unauthorizedAPI.get('/user-and-roles'));
};
const updateUserAndRole = ({ formData, _id }: UserAndRoleParams): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.put(`/user-and-roles/${_id}`, formData));
};

const createUserAndRole = ({ userId, roleId }: { userId: string, roleId: string }): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.post('/user-and-roles', { userId, roleId }));
};

export const useGetAllUserAndRoles = () => useQuery<any, Error>({ queryKey: ["user-and-roles"], queryFn: getAllUserAndRoles });

export const useUpdateUserAndRole = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, UserAndRoleParams>({
        mutationFn: updateUserAndRole, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-and-roles'] })
        },
    })
}
export const useCreateUserAndRole = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, any>({
        mutationFn: createUserAndRole, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-and-roles'] })
        },
    })
}
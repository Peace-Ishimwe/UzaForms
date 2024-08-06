"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authorizedAPI, unauthorizedAPI } from "@/utils/api";
import handleApiRequest from '@/utils/handleApiRequest';

interface RoleParams {
    _id?: string;
    formData?: any;
}
const getAllRoles = (): Promise<any> => {
    return handleApiRequest(() => unauthorizedAPI.get('/roles'));
};
const updateRole = ({ formData, _id }: RoleParams): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.put(`/roles/${_id}`, formData));
};

const createRole = (formData: any): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.post('/roles', formData));
};

export const useGetAllRoles = () => useQuery<any, Error>({ queryKey: ["roles"], queryFn: getAllRoles });
export const useUpdateRole = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, RoleParams>({mutationFn: updateRole, onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['roles'] })},
})}
export const useCreateRole = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, any>({ mutationFn: createRole, onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['roles'] })},
})}
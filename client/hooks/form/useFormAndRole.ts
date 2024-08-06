"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authorizedAPI, unauthorizedAPI } from "@/utils/api";
import handleApiRequest from '@/utils/handleApiRequest';

interface FormAndRoleParams {
    _id?: string;
    formData?: any;
}
const getAllFormAndRoles = (): Promise<any> => {
    return handleApiRequest(() => unauthorizedAPI.get('/form-and-roles'));
};
const updateFormAndRole = ({ formData, _id }: FormAndRoleParams): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.put(`/form-and-roles/${_id}`, formData));
};

const createFormAndRole = ({ formNameId, roleId }: { formNameId: string, roleId: string }): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.post('/form-and-roles', { formNameId, roleId }));
};

export const useGetAllFormAndRoles = () => useQuery<any, Error>({ queryKey: ["form-and-roles"], queryFn: getAllFormAndRoles });

export const useUpdateFormAndRole = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, FormAndRoleParams>({
        mutationFn: updateFormAndRole, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['form-and-roles'] })
        },
    })
}
export const useCreateFormAndRole = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, any>({
        mutationFn: createFormAndRole, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['form-and-roles'] })
        },
    })
}
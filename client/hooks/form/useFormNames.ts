"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authorizedAPI, unauthorizedAPI } from "@/utils/api";
import handleApiRequest from '@/utils/handleApiRequest';

interface FormNameParams {
    _id?: string;
    formData?: any;
}
const getAllFormNames = (): Promise<any> => {
    return handleApiRequest(() => unauthorizedAPI.get('/form-name'));
};
const updateFormName = ({ formData, _id }: FormNameParams): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.put(`/form-name/${_id}`, formData));
};

const createFormName = (formData: any): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.post('/form-name', formData));
};

export const useGetAllFormNames = () => useQuery<any, Error>({ queryKey: ["FormNames"], queryFn: getAllFormNames });

export const useUpdateFormName = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, FormNameParams>({mutationFn: updateFormName, onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['FormNames'] })},
})}

export const useCreateFormName = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, any>({ mutationFn: createFormName, onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['FormNames'] })},
})}
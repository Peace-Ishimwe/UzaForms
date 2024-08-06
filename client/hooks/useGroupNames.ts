"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authorizedAPI, unauthorizedAPI } from "@/utils/api";
import handleApiRequest from '@/utils/handleApiRequest';

interface GroupNameParams {
    _id?: string;
    formData?: any;
}
const getAllGroupNames = (): Promise<any> => {
    return handleApiRequest(() => unauthorizedAPI.get('/group-name'));
};
const updateGroupName = ({ formData, _id }: GroupNameParams): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.put(`/group-name/${_id}`, formData));
};

const createGroupName = (formData: any): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.post('/group-name', formData));
};

export const useGetAllGroupNames = () => useQuery<any, Error>({ queryKey: ["GroupNames"], queryFn: getAllGroupNames });

export const useUpdateGroupName = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, GroupNameParams>({mutationFn: updateGroupName, onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['GroupNames'] })},
})}

export const useCreateGroupName = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, any>({ mutationFn: createGroupName, onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['GroupNames'] })},
})}
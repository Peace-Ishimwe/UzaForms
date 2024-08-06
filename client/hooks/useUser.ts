"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authorizedAPI, unauthorizedAPI } from "@/utils/api";
import handleApiRequest from "@/utils/handleApiRequest";

interface UserParams {
    _id?: string;
    formData?: any;
}
const getAllUsers = (): Promise<any> => {
    return handleApiRequest(() => unauthorizedAPI.get("/users"));
};
const updateUsers = ({ formData, _id }: UserParams): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.put(`/users/${_id}`, formData));
};

export const useGetAllUsers = () =>
    useQuery<any, Error>({ queryKey: ["users"], queryFn: getAllUsers });

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, UserParams>({
        mutationFn: updateUsers,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

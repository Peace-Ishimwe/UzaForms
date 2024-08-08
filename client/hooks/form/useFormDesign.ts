import { authorizedAPI, unauthorizedAPI } from "@/utils/api";
import handleApiRequest from '@/utils/handleApiRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface FormParams {
    _id?: string;
    formDesignData?: any;
}

const getAllFormDesigns = (): Promise<any> => {
    return handleApiRequest(() => unauthorizedAPI.get('/form-design'));
};

const createFormDesign = ({ formId, sections }: { formId: string,  sections: any }): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.post('/form-design', { formId, sections }));
};

const updateFormDesign = ({ formDesignData, _id }: FormParams): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.put(`/form-design/${_id}`, formDesignData));
};

const getFormDesignById = ({ queryKey }: any) => {
    const [_, _id] = queryKey;
    console.log(_id);
    
    return handleApiRequest(() => unauthorizedAPI.get(`/form-design/${_id}`));
};

export const useGetAllFormDesigns = () => useQuery<any, Error>({ queryKey: ["form-design"], queryFn: getAllFormDesigns });

export const useGetFormDesignById = (_id: string) => useQuery<any, Error, any>({ queryKey: ['form-design', _id], queryFn: getFormDesignById });

export const useCreateFormDesign = () => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, any>({
        mutationFn: createFormDesign,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['form-design'] });
        },
    });
};

export const useUpdateFormDesign = () => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, FormParams>({
        mutationFn: updateFormDesign,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['form-design'] });
        },
    });
};
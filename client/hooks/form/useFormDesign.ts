import { authorizedAPI, unauthorizedAPI } from "@/utils/api";
import handleApiRequest from '@/utils/handleApiRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface FormParams {
    formId?: string;
    formDesignData?: any;
}

const getAllFormDesigns = (): Promise<any> => {
    return handleApiRequest(() => unauthorizedAPI.get('/form-design'));
};

const createFormDesign = ({ formId, sections }: { formId: string,  sections: any }): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.post('/form-design', { formId, sections }));
};

const updateFormDesign = ({ formDesignData, formId }: FormParams): Promise<any> => {
    return handleApiRequest(() => authorizedAPI.put(`/form-design`, {formDesignData, formId}));
};

const getFormDesignById = ({ queryKey }: any) => {
    const [_, formId] = queryKey;
    return handleApiRequest(() => unauthorizedAPI.get(`/form-design/${formId}`));
};

export const useGetAllFormDesigns = () => useQuery<any, Error>({ queryKey: ["form-design"], queryFn: getAllFormDesigns });

export const useGetFormDesignById = (formId: string) => useQuery<any, Error, any>({ queryKey: ['form-design', formId], queryFn: getFormDesignById });

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
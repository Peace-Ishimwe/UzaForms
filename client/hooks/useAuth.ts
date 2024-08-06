import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authorizedAPI, unauthorizedAPI } from "@/utils/api";
import handleApiRequest from '@/utils/handleApiRequest';
import { FormInputValues } from '@/types';

const register = (userData: FormInputValues) => {
    return handleApiRequest(() => unauthorizedAPI.post('/register', userData));
}

const login = (userData: any) => {
    return handleApiRequest(() => unauthorizedAPI.post('/login', userData));
}

const sendOtp = ({ email } : { email: string } ) => {
    return handleApiRequest(() => unauthorizedAPI.post('/send-otp', { email }));
}

const verifyEmail = ({ email, OTP }:{ email: string, OTP: string }) => {
    return handleApiRequest(() => unauthorizedAPI.post('/validate/email', { email, OTP }));
}

export const useRegister = () => useMutation<any, Error, FormInputValues>({ mutationFn: register });
export const useLogin = () => useMutation<any, Error, any>({ mutationFn: login })
export const useSendOtp = () => useMutation<any, Error, any>({ mutationFn: sendOtp })
export const useVerifyEmail = () => useMutation<any, Error, any>({ mutationFn: verifyEmail })
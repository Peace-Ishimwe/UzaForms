import axios, { AxiosInstance } from "axios";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
const commonHeaders = {
    'Content-Type': 'application/json',
};

const unauthorizedAxiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: commonHeaders,
});

const authorizedAxiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: commonHeaders,
});

authorizedAxiosInstance.interceptors.request.use(
    async (config) => {
        const token = await cookies.get('token');
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const unauthorizedAPI = unauthorizedAxiosInstance;
export const authorizedAPI = authorizedAxiosInstance;
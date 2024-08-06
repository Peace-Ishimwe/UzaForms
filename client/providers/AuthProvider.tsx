"use client"
import { ReactNode, useEffect, useState } from 'react';
import { authorizedAPI } from '@/utils/api';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const { setUser } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const pathName = usePathname();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true);
                const response = await authorizedAPI.get('/validate/token');
                setLoading(false);

                if (response.status === 200) {
                    const userData = response.data;
                    setUser(userData.user);
                } else {
                    if (!['/', '/auth/login', '/auth/signup'].includes(pathName)) {
                        router.push("/auth/login");
                    }
                }
            } catch (error) {
                setLoading(false);
                if (!['/', '/auth/login', '/auth/signup'].includes(pathName)) {
                    router.push("/auth/login");
                }
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return <>{children}</>;
};

export default AuthProvider;
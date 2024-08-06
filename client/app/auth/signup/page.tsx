"use client"
import { GoogleAuthButton } from '@/components/AuthButtons';
import PrimaryButton from '@/components/Button/PrimaryButton';
import CustomInput from '@/components/CustomInput';
import OrWith from '@/components/OrWith';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import { validateForm, showToast } from '@/validation/formValidator';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormInputValues } from '@/types';
import { useRegister, useSendOtp } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { storeData } from '@/utils/storage';
import { Cookies } from 'react-cookie';

const cookies = new Cookies()

const Signup = () => {
    const [userData, setUserData] = useState<FormInputValues>({ email: '', firstName: '', lastName: '', password: '' });
    const [confirmPassword, setConfirmPassword] = useState('')
    const registerMutation = useRegister()
    const sendOtpMutation = useSendOtp()
    const router = useRouter();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUserData((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = validateForm(userData);

        if (Object.keys(validationErrors).length > 0) {
            for (const [key, error] of Object.entries(validationErrors)) {
                showToast(error);
            }
        } else {
            try {
                const data = await registerMutation.mutateAsync(userData);
                if (data?.success === true) {
                    const response = await sendOtpMutation.mutateAsync({ email: userData.email })
                    if (response?.success == true) {
                        storeData('User', { firstName: userData.firstName, lastName: userData.lastName, email: userData.email })
                        cookies.set('token', data.token, { path: '/' })
                        router.push('/auth/verify-email');
                    } else {
                        showToast(response.error);
                    }
                } else {
                    showToast(data.message);
                }
            } catch (error) {
                showToast('Registration failed. Please try again.');
            }
        }
    };

    const googleAuth = () => {
		window.open(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/google/callback`,
			"_self"
		);
	};

    return (
        <>
            <ToastContainer />
            <main className='flex flex-row-reverse items-stretch bg-background text-black h-[100vh]'>
                <section className='w-full px-4 sm:px-0 overflow-y-auto py-6 lg:py-0 lg:pb-8 sm:w-6/12 mx-auto sm:min-w-[480px]'>
                    <div className='flex justify-between lg:justify-end h-fit sm:p-6'>
                        <img
                            src={'/logo.png'}
                            alt='UzaForms'
                            className='block lg:hidden w-[40px] h-[41.79px]'
                        />
                        <div className='flex items-center space-x-1 text-sm'>
                            <p className='text-black'>Have an account?</p>
                            <Link href={'/auth/login'} className='text-primary'>Sign in!</Link>
                        </div>
                    </div>
                    <section className='pt-6 sm:pt-0'>
                        <p className='text-[2xl] lg:text-3xl text-black text-center font-semibold'>Get Started With UzaForms</p>
                        <p className='text-base mt-2 lg:mt-3 text-black text-center'>Getting started is easy</p>
                    </section>
                    <section className='auth-providers flex items-center justify-center space-x-4 mt-8'>
                        <GoogleAuthButton 
                            handlePress={googleAuth}
                        />
                    </section>
                    <OrWith />
                    <form onSubmit={handleSubmit} className='flex justify-center flex-col items-center space-y-5 mt-8 max-w-[400px] mx-auto'>
                        <CustomInput
                            placeholder='First Name'
                            type='text'
                            containerStyles=''
                            name='firstName'
                            value={userData.firstName}
                            onChange={handleChange}
                        />
                        <CustomInput
                            placeholder='Last Name'
                            type='text'
                            containerStyles=''
                            name='lastName'
                            value={userData.lastName}
                            onChange={handleChange}
                        />
                        <CustomInput
                            placeholder='Email'
                            type='email'
                            containerStyles=''
                            name='email'
                            value={userData.email}
                            onChange={handleChange}
                        />
                        <div className='w-full'>
                            <CustomInput
                                placeholder='Password'
                                type='password'
                                containerStyles='pr-4'
                                name='password'
                                value={userData.password}
                                onChange={handleChange}
                            />
                            {
                                userData.password !== confirmPassword &&
                                (
                                    <p className='text-red-500 text-sm pl-2'>Passwords do not match</p>
                                )
                            }
                        </div>
                        <CustomInput
                            placeholder='Confirm Password'
                            type='password'
                            containerStyles='pr-4 w-full'
                            name='confirmPassword'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <section className='w-full flex items-center justify-between'>
                            <div className='flex items-center space-x-2'>
                                <input type="checkbox" name="remember-me" id="remember-me" className='w-4 h-4' />
                                <p className='text-[13px] text-[#1A1A1A]'>Remember me</p>
                            </div>
                            <Link href={'/'} className='text-[#D93F21] text-[13px]'>Recover password</Link>
                        </section>
                        <PrimaryButton
                            title='Sign Up'
                            containerStyles='w-full'
                            textStyles=''
                            loading={registerMutation.isPending || sendOtpMutation.isPending}
                        />
                    </form>
                </section>
                <section className='bg-[url("/signupbackground.png")] h-[100vh] hidden lg:block w-6/12 bg-cover bg-no-repeat'>
                    <img
                        src={'/logo.png'}
                        alt='UzaForms'
                        className='p-6'
                    />
                </section>
            </main>
        </>
    );
};

export default Signup;
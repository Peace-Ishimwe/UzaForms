"use client"
import { GoogleAuthButton } from '@/components/AuthButtons'
import PrimaryButton from '@/components/Button/PrimaryButton'
import CustomInput from '@/components/CustomInput'
import OrWith from '@/components/OrWith'
import { useLogin } from '@/hooks/useAuth'
import { FormInputValues } from '@/types'
import { storeData } from '@/utils/storage'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Cookies } from 'react-cookie'
import { toast, ToastContainer } from 'react-toastify'
import { validateLoginForm, showToast } from '@/validation/formValidator';

const cookies = new Cookies()

const Login = () => {
    const [userData, setUserData] = useState<Partial<FormInputValues>>({ email: '', password: '' });
    const loginMutation = useLogin()
    const router = useRouter()
    console.log(cookies.getAll())

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUserData((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const validationErrors = validateLoginForm(userData as  Partial<FormInputValues>);

        if (Object.keys(validationErrors).length > 0) {
            for (const [key, error] of Object.entries(validationErrors)) {
                showToast(error);
            }
        } else {
            try {
                const data = await loginMutation.mutateAsync(userData)
                if (data?.success == true) {
                    storeData('userId', data.userId)
                    cookies.set('token', data.token ,  { path: '/' })
                    router.push('/dashboard')
                } else {
                    showToast(data.message);
                }
            } catch (error) {
                toast.error('Login failed try again')
            }
        }
    }

    const googleAuth = () => {
		window.open(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/google/callback`,
			"_self"
		);
	};

    return (
        <main className='flex items-stretch bg-background text-black h-[100vh]'>
            <ToastContainer />
            <section className='w-full px-4 sm:px-0 overflow-y-auto py-6 lg:py-0 sm:w-6/12 mx-auto sm:min-w-[480px]'>
                <div className='flex justify-between h-fit sm:p-6'>
                    <img
                        src={'/logo.png'}
                        alt='UzaForms'
                        className='max-[1024px]:w-[40px] max-[1024px]:h-[41.79px]'
                    />
                    <div className='flex items-center space-x-1 text-sm'>
                        <p className='text-black'>Don't have account ?</p>
                        <Link href={'/auth/signup'} className='text-primary'>Sign up!</Link>
                    </div>
                </div>
                <section className='pt-6 sm:pt-0'>
                    <p className='text-2xl lg:text-3xl text-black text-center font-semibold'>Welcome Back</p>
                    <p className='text-base mt-2 lg:mt-3 text-black text-center'>Login into your account</p>
                </section>
                <section className='auth-providers flex items-center justify-center space-x-4 mt-8'>
                    <GoogleAuthButton 
                        handlePress={googleAuth}
                    />
                </section>
                <OrWith />
                <form onSubmit={handleSubmit} className='flex justify-center flex-col items-center space-y-8 mt-8  max-w-[400px] mx-auto'>
                    <CustomInput
                        placeholder='Email'
                        type='text'
                        containerStyles=''
                        name='email'
                        onChange={handleChange}
                    />
                    <CustomInput
                        placeholder='Password'
                        type='password'
                        containerStyles='pr-4'
                        name='password'
                        onChange={handleChange}
                    />
                    <section className='w-full flex items-center justify-between'>
                        <div className='flex items-center space-x-2'>
                            <input type="checkbox" name="remember-me" id="remember-me" className='w-4 h-4' />
                            <p className='text-[13px] text-[#1A1A1A]'>Remember me</p>
                        </div>
                        <Link href={'/'} className='text-[#D93F21] text-[13px]'>Recover password</Link>
                    </section>
                    <PrimaryButton
                        title='Log In'
                        containerStyles='w-full'
                        textStyles=''
                        loading={loginMutation.isPending}
                    />
                </form>
            </section>
            <section className='bg-[url("/loginbackground.png")] h-[100vh] hidden lg:block w-6/12 bg-cover bg-no-repeat'>
            </section>
        </main>
    )
}

export default Login

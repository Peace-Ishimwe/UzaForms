"use client"
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useVerifyEmail } from '@/hooks/useAuth';
import { getData } from '@/utils/storage';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { toast, ToastContainer } from 'react-toastify';

const VerifyEmail = () => {
    const [otp, setOtp] = useState('');
    const [user, setUser] = useState({ email: '', firstName: '', lastName: '' });
    const verifyEmailMutation = useVerifyEmail()
    const router = useRouter()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getData('User');
                if (userData) {
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);


    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const data = await verifyEmailMutation.mutateAsync({ email: user.email, OTP: otp })
            if (data?.success == true) {
                router.push('/dashboard')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Verification failed')
        }
    }

    return (
        <main>
            <ToastContainer />
            <div className="ellipse-bg-otp-verification flex justify-center items-center rounded-3xl mx-auto mt-[2rem] md:p-[4rem] max-w-[1240px] py-[1rem] md:w-fit w-full">
                <form onSubmit={handleSubmit} className="rounded-3xl border p-4 md:p-10 shadow-sm  w-11/12 md:min-w-[607px] flex flex-col items-center ">
                    <h1 className='text-[#000D3B] text-3xl font-medium text-center'>OTP Verification</h1>
                    <p className='text-[#989898] font-medium mt-[2rem] text-sm text-center'>
                        We've sent an OTP code check your email <br />
                        <b className='text-black'>{user.email}</b> and fill it in.
                    </p>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span></span>}
                        renderInput={(props) => <input {...props} />}
                        containerStyle={'w-full flex items-center justify-center mt-6 space-x-2'}
                        inputStyle={'border min-w-10 min-h-10 rounded-md border-'}
                    />
                    <PrimaryButton
                        title='Submit'
                        containerStyles='w-6/12 mx-auto mt-6'
                        textStyles=''
                        loading={verifyEmailMutation.isPending}
                    />
                </form>
            </div>
        </main>
    )
}

export default VerifyEmail
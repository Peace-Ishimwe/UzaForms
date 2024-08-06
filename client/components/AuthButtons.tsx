import React, { FC } from 'react'
import { Icon } from '@iconify/react';

interface buttonProps {
    handlePress: () => void;
}

export const GoogleAuthButton: FC<buttonProps> = ({ handlePress }) => {
    return (
        <button onClick={handlePress} className='flex items-center justify-center space-x-2 text-black px-4 py-2 border-2 border-primary rounded-md w-full max-w-[320px]'>
            <Icon icon="flat-color-icons:google" className='text-[24px]' />
            <p>Google</p>
        </button>
    )
}

export const FacebookAuthButton = () => {
    return(
        <button className='flex items-center space-x-2 text-black px-4 py-2 border-2 border-[#DEDEDE] rounded-md'>
            <Icon icon="logos:facebook" />
            <p>Facebook</p>
        </button>
    )
}
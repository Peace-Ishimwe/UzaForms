"use client"
import { Icon } from '@iconify/react';
import React, { FC, FormEvent, useState } from 'react'

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    type: string;
    containerStyles?: string;
    inputStyles?: string;
}

const CustomInput: FC<inputProps> = ({ type, placeholder, containerStyles, inputStyles, ...props }) => {
    const [inputType, setInputType] = useState(type)

    const handleTogglePassword = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        { inputType == 'password' ? setInputType('text') : setInputType('password') }
    }

    return (
        <main className={`border border-[#D9D9D9] rounded-xl w-full overflow-hidden focus-within:border-primary ${containerStyles} flex items-center bg-white`}>
            <input type={inputType} placeholder={placeholder} className={`p-5 text-[#5A5A5A] placeholder:text-[#5A5A5A] text-sm w-full outline-none ${inputStyles}`} { ...props } />
            {
                type == 'password' && inputType == 'password' ?
                    <button onClick={handleTogglePassword}>
                        <Icon icon="bi:eye" className='text-[20px] text-textmain' />
                    </button> :
                    type == 'password' && inputType == 'text' ?
                        <button onClick={handleTogglePassword}>
                            <Icon icon="humbleicons:eye-off" className='text-[20px] text-textmain' />
                        </button> :
                        null
            }
        </main>
    )
}

export default CustomInput
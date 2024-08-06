import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Icon } from '@iconify/react'

const ProfileDropdown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center outline-none focus:ring-0 hover:bg-slate-100 p-2 rounded-md space-x-2'>
                <div className='bg-primary text-white text-xl p-2 rounded-full'>
                    <Icon icon="ep:avatar" />
                </div>
                <div className='flex flex-col items-start'>
                    <p className='text-base'>Peace Ishimwe</p>
                    <p className='text-[10px] -mt-1'>peaceishimwem@gmail.com</p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-full min-w-[16rem]'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileDropdown
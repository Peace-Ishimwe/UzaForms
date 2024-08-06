"use client";
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

interface Props {
    setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NavItem {
    name: string;
    href?: string;
    icon?: string;
    subItems?: NavItem[];
}

const navItems: NavItem[] = [
    { name: 'Home', href: '/dashboard', icon: 'ic:baseline-dashboard' },
    {
        name: 'Groups',
        icon: 'uis:layer-group',
        subItems: [
            { name: 'Groups Names', href: '/dashboard/group/names' },
            { name: 'Group and Roles', href: '/dashboard/group/roles' },
        ]
    },
    {
        name: 'Forms',
        icon: 'icon-park-solid:doc-add',
        subItems: [
            { name: 'Form Names', href: '/dashboard/form/names' },
            { name: 'Form and Roles', href: '/dashboard/form/roles' },
            { name: 'Form Design', href: '/dashboard/form/design' },
        ]
    },
    {
        name: 'Settings',
        icon: 'solar:settings-bold',
        subItems: [
            { name: 'Roles', href: '/dashboard/settings/roles' },
            { name: 'Users', href: '/dashboard/settings/users' },
            { name: 'User and Roles', href: '/dashboard/settings/user-and-roles' },
        ]
    },
];

const DashboardSidebar: React.FC<Props> = ({ setIsSheetOpen }) => {
    const pathName = usePathname();
    const router = useRouter();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const toggleDropdown = (name: string) => {
        setOpenDropdown(prev => (prev === name ? null : name));
    };

    const renderNavItem = (item: NavItem) => {
        const isOpen = openDropdown === item.name;
        const isActive = pathName === item.href || item.subItems?.some(subItem => pathName.startsWith(subItem.href!));

        if (item.subItems) {
            return (
                <div key={item.name} className='relative'>
                    <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`w-full text-base max-w-[192px] transition duration-300 hover:bg-primary hover:text-white p-2 rounded flex items-center justify-between ${isActive ? 'bg-primary text-white' : ''}`}
                    >
                        <div className='flex items-center gap-2'>
                            <Icon icon={item.icon as string} fontSize={18} />
                            {item.name}
                        </div>
                        <Icon icon={isOpen ? "ic:baseline-keyboard-arrow-up" : "ic:baseline-keyboard-arrow-down"} fontSize={18} />
                    </button>
                    {isOpen && (
                        <div className='mt-1 ps-3 w-full rounded transition duration-300'>
                            {item.subItems.map(subItem => {
                                const isSubItemActive = pathName === subItem.href;
                                return (
                                    <Link href={subItem.href!} key={subItem.name} className={`block text-sm max-w-[192px] transition duration-300 hover:bg-background py-2 px-3 rounded ${isSubItemActive ? 'text-primary' : 'text-black'}`}>
                                        {subItem.name}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <Link href={item.href!} key={item.name} className={`text-base max-w-[192px] transition duration-300 hover:bg-primary hover:text-white p-2 rounded flex items-center gap-2 ${isActive ? 'bg-primary text-white' : ''}`}>
                    <Icon icon={item.icon as string} fontSize={18} />
                    {item.name}
                </Link>
            );
        }
    };

    return (
        <main className='bg-white h-full border-r w-full px-[1rem] pt-[1.5rem] pb-[4rem] grid grid-rows-4 max-h-[1024px]'>
            <Link href={'/'} className='text-2xl text-center text-blue-700 font-semibold'>
                <span>Uza</span><span className='text-black'>Forms</span>
            </Link>
            <nav className='flex flex-col gap-2'>
                {navItems.map(renderNavItem)}
            </nav>
        </main>
    );
}

export default DashboardSidebar;
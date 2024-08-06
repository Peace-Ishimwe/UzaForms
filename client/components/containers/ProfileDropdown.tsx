import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Icon } from '@iconify/react';
import { useAuthStore } from '@/store/useAuthStore';

const ProfileDropdown: React.FC = () => {
    const { user } = useAuthStore();
    const router = useRouter();
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    const handleLogout = () => {
        // Clear cookies and local storage
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        localStorage.clear();

        // Redirect to login page
        router.push('/auth/login');
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center outline-none focus:ring-0 hover:bg-slate-100 p-2 rounded-md space-x-2'>
                    <div className='bg-primary text-white text-xl p-2 rounded-full'>
                        <Icon icon="ep:avatar" />
                    </div>
                    <div className='flex flex-col items-start'>
                        <p className='text-base'>{user?.firstName} {user?.lastName}</p>
                        <p className='text-[10px] -mt-1'>{user?.email}</p>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-full min-w-[16rem]'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsLogoutDialogOpen(true)}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Logout Confirmation Dialog */}
            {isLogoutDialogOpen && (
                <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Logout</DialogTitle>
                        </DialogHeader>
                        <p>Are you sure you want to logout?</p>
                        <DialogFooter>
                            <button
                                onClick={() => setIsLogoutDialogOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-black rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                            >
                                Logout
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default ProfileDropdown;
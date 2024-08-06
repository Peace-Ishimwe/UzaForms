"use client";
import React from "react";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import ProfileDropdown from "./containers/ProfileDropdown";
import { useAuthStore } from "@/store/useAuthStore";

interface props {
    setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSidebarOpen: boolean
}

const DashboardNavbar: React.FC<props> = ({ setIsSheetOpen, setIsSidebarOpen, isSidebarOpen }) => {
    const pathname = usePathname();
    const { user } = useAuthStore()

    return (
        <main className="h-[64px] transition-all duration-300 top-0 sticky border-b bg-white flex flex-row-reverse sm:flex-row items-center justify-between  px-[1rem] w-full z-50">
            <Button
                variant="ghost"
                className={`lg:hidden p-0 hover:bg-inherit`}
                onClick={() => setIsSheetOpen(true)}
            >
                <Icon icon={"iconamoon:menu-burger-horizontal"} fontSize={24} />
            </Button>
            <section className="flex items-center space-x-2">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="bg-[#F5F6FA] p-2 rounded-md text-gray-700">
                    <Icon icon="material-symbols:legend-toggle-rounded" fontSize={24} />
                </button>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <Icon icon="ic:baseline-search" />
                    </div>
                    <input type="text" id="simple-search" className="bg-[#F5F6FA] border border-[#D5D5D5] text-gray-900 text-sm rounded-full focus:ring-primary focus:border-primary block w-[388px] ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary" placeholder="Search..." required />
                </div>
            </section>
            <section className="hidden sm:flex  gap-x-4 items-center">
                <div className="text-primary text-xl relative">
                    <Icon icon="fa-solid:bell" />
                    <div className="bg-[#F93C65] w-[10px] h-[10px] absolute top-0 right-0 rounded-full"></div>
                </div>
                <ProfileDropdown />
            </section>
            <img src="/logo.png" alt="logo" className="w-[50px] h-[40px] sm:hidden" />
        </main>
    );
};

export default DashboardNavbar;

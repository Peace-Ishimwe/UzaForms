"use client"
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps): JSX.Element {

    const [isOpen, setIsOpen] = useState(false);
    const [isClient, setIsClient] = useState(true);
    const [isSidebar, setIsSidebar] = useState(true)

    return (
        <main className="flex max-w-screen-2xl mx-auto h-[100vh] bg-[#F5F6FA]">
            {
                isSidebar && (
                    <section className="w-[245px] transition-all duration-300 sticky top-0 hidden lg:block min-w-[180px] h-full bg-background">
                        <DashboardSidebar setIsSheetOpen={setIsOpen} />
                    </section>
                )
            }
            {isClient && (
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetContent side={"left"} className="px-0 w-[280px]">
                        <DashboardSidebar setIsSheetOpen={setIsOpen} />
                    </SheetContent>
                </Sheet>
            )}
            <section className="flex-1 overflow-y-auto">
                <DashboardNavbar setIsSheetOpen={setIsOpen} setIsSidebarOpen={setIsSidebar} isSidebarOpen={isSidebar} />
                {children}
            </section>
        </main>
    );
}

export default DashboardLayout;
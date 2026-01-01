import { Sidebar } from "./sidenavbar/SideNavBar";
import { TopNavBar } from "./TopNavBar";
import Footer from "./Footer";

export function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopNavBar />
                <main className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        {children}
                    </div>
                </main>
                <Footer isCollapsed={false} isMobile={false} />
            </div>
        </div>
    );
}
import { Sidebar } from "./sidenavbar/SideNavBar";
import TopNav from "./TopNavBar";
import Footer from "./Footer";

export function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex bg-main-100 min-h-screen text-main-900">            
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopNav toggleSidebar={() => {}} isCollapsed={false} isMobile={false} />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
                <Footer isCollapsed={false} isMobile={false} />
            </div>
        </div>
    );
}
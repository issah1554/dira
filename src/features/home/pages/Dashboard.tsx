import { Sidebar } from "../../../components/layout/sidenavbar/SideNavBar";

export function Dashboard() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 bg-main-100 min-h-screen text-main-700">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p>Welcome to your dashboard! Here you can find an overview of your activities.</p>
            </div>
        </div>
    );
}

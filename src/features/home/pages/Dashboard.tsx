import { Sidebar } from "../../../components/layout/sidenavbar/SideNavBar";

export function Dashboard() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p>Welcome to your dashboard! Here you can find an overview of your activities.</p>
            </div>
        </div>
    );
}

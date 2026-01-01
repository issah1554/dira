import { AppLayout } from "../../../components/layout/AppLayout";

export function Dashboard() {
    return (
        <AppLayout>
            <div className="flex-1 p-6  text-main-700">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p>Welcome to your dashboard! Here you can find an overview of your activities.</p>
            </div>
        </AppLayout>
    );
}

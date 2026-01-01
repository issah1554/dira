import { AppLayout } from "../../../components/layout/AppLayout";
import { DropdownMenu, type DropdownItem } from "../../../components/ui/Dropdown";

const items: DropdownItem[] = [
    { label: "Profile" },
    {
        label: "Settings",
        subItems: [
            { label: "Account" },
            {
                label: "Security",
                subItems: [
                    { label: "Passwords" },
                    { label: "2FA" },
                ],
            },
        ],
    },
    { label: "Logout" },
];

export function Dashboard() {
    return (
        <AppLayout>
            <div className="flex-1 p-6  text-main-700">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p>Welcome to your dashboard! Here you can find an overview of your activities.</p>

                <div className="mt-6">
                    <DropdownMenu
                        toggler={
                            <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                                Open Menu
                            </button>
                        }
                        items={items}
                    />
                </div>
            </div>
        </AppLayout>
    );
}

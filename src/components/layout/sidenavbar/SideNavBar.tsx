import {
    SideNavLayout,
    SideNavHeader,
    SideNavMain,
    SideNavFooter,
} from "./SideNavBarLayout";

import { NavItems } from "./NavItems";
import { NavSection } from "./NavSection";
import { NavItem } from "./NavItem";

export function Sidebar() {
    return (
        <SideNavLayout>

            <SideNavHeader sticky={false}>
                <div className="px-3 py-4 flex items-center gap-2 text-xl font-bold">
                    <i className="bi bi-rocket-takeoff text-primary" />
                    MyApp
                </div>
            </SideNavHeader>

            <SideNavMain>
                <div className="px-3 py-4 space-y-3">
                    <NavItems
                        title="Main Menu"
                        items={[
                            { label: "Dashboard", to: "/", icon: <i className="bi bi-house" /> },
                            { label: "Calendar", to: "/calendar", icon: <i className="bi bi-calendar" />, badge: 3 },
                            {
                                label: "Projects",
                                icon: <i className="bi bi-folder" />,
                                subItems: [
                                    { label: "All Projects", to: "/projects" },
                                    { label: "Active", to: "/projects/active" },
                                    { label: "Archived", to: "/projects/archived" },
                                ],
                            },
                        ]}
                    />

                    <NavSection
                        title="Administration"
                        icon={<i className="bi bi-shield-lock" />}
                        items={[
                            { label: "Users", to: "/admin/users", icon: <i className="bi bi-people" /> },
                            { label: "Roles", to: "/admin/roles", icon: <i className="bi bi-person-badge" /> },
                        ]}
                    />

                    <NavSection
                        title="Settings"
                        icon={<i className="bi bi-gear" />}
                        defaultCollapsed
                        items={[
                            { label: "General", to: "/settings", icon: <i className="bi bi-sliders" /> },
                            { label: "Billing", to: "/settings/billing", icon: <i className="bi bi-credit-card" /> },
                        ]}
                    />
                </div>
            </SideNavMain>

            <SideNavFooter sticky={false}>
                <div className="px-3 py-3 space-y-1">
                    <NavItem
                        label="Help & Support"
                        to="/help"
                        icon={<i className="bi bi-question-circle" />}
                    />
                    <NavItem
                        label="Logout"
                        icon={<i className="bi bi-box-arrow-right" />}
                    />
                </div>
            </SideNavFooter>

        </SideNavLayout>
    );
}

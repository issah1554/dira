import { useState, type ReactNode } from "react";
import { NavItem, type NavItemProps } from "./NavItem";

type NavSectionProps = {
    title: string;
    icon?: ReactNode;
    items: NavItemProps[];
    defaultCollapsed?: boolean;
};

export function NavSection({
    title,
    icon,
    items,
    defaultCollapsed = false,
}: NavSectionProps) {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);

    return (
        <div className="mt-3 border-t border-main-200 pt-2">
            <button
                onClick={() => setCollapsed(v => !v)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase text-main-500"
            >
                <div className="flex items-center gap-2">
                    {icon}
                    {title}
                </div>
                <span>{collapsed ? "▸" : "▾"}</span>
            </button>

            {!collapsed && (
                <div className="mt-1 space-y-0.5">
                    {items.map((item, i) => (
                        <NavItem key={i} {...item} />
                    ))}
                </div>
            )}
        </div>
    );
}

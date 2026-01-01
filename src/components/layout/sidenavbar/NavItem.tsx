import { useState, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

export type NavItemProps = {
    label: string;
    icon?: ReactNode;
    to?: string;
    subItems?: NavItemProps[];
    badge?: number;
    depth?: number;
};

export function NavItem({
    label,
    icon,
    to,
    subItems,
    badge,
    depth = 0,
}: NavItemProps) {
    const location = useLocation();
    const hasSubItems = !!subItems?.length;
    const [isOpen, setIsOpen] = useState(false);

    const isActive = to && location.pathname === to;
    const isChildActive =
        hasSubItems && subItems!.some(i => i.to === location.pathname);

    useEffect(() => {
        if (isChildActive) setIsOpen(true);
    }, [isChildActive]);

    const paddingLeft = 12 + depth * 20;

    const content = (
        <div
            className={`flex items-center justify-between px-3 py-2 rounded text-sm cursor-pointer
        ${isActive || isChildActive ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            style={{ paddingLeft }}
            onClick={() => hasSubItems && setIsOpen(v => !v)}
        >
            <div className="flex items-center gap-2 truncate">
                {hasSubItems && (
                    <span className="text-xs">
                        {isOpen ? "▾" : "▸"}
                    </span>
                )}
                {icon}
                <span className="truncate">{label}</span>
            </div>

            {badge && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700">
                    {badge}
                </span>
            )}
        </div>
    );

    return (
        <div>
            {/* Leaf navigates, parent collapses */}
            {to && !hasSubItems ? (
                <Link to={to}>{content}</Link>
            ) : (
                content
            )}

            {hasSubItems && isOpen && (
                <div className="mt-0.5 space-y-0.5">
                    {subItems!.map((item, i) => (
                        <NavItem key={i} {...item} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

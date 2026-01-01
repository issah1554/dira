import {type ReactNode } from "react";

type TopNavBarProps = {
    left?: ReactNode;    // e.g., logo, menu button
    center?: ReactNode;  // e.g., page title, breadcrumbs
    right?: ReactNode;   // e.g., user menu, icons
    sticky?: boolean;    // stick to top
    className?: string;
};

export function TopNavBar({
    left,
    center,
    right,
    sticky = true,
    className = "",
}: TopNavBarProps) {
    return (
        <header
            className={`w-full flex items-center justify-between px-4 py-2
                  bg-main-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700
                  ${sticky ? "sticky top-0 z-20" : ""}
                  ${className}`}
        >
            {/* Left slot */}
            <div className="flex items-center gap-2">
                {left}
            </div>

            {/* Center slot */}
            {center && <div className="flex-1 flex justify-center">{center}</div>}

            {/* Right slot */}
            <div className="flex items-center gap-2">
                {right}
            </div>
        </header>
    );
}

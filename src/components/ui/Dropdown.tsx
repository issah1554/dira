import { useState, type ReactNode } from "react";

/* =======================
   Types
======================= */

export type DropdownItem = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  subItems?: DropdownItem[];
};

export type DropdownMenuProps = {
  toggler: ReactNode;
  items: DropdownItem[];
  openMode: "hover" | "click";
};

/* =======================
   Public Component
======================= */

export function DropdownMenu({
  toggler,
  items,
  openMode,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);

  const hoverProps =
    openMode === "hover"
      ? {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
      }
      : {};

  return (
    <div className="relative inline-block text-left" {...hoverProps}>
      {/* Toggler */}
      <div
        className="cursor-pointer"
        onClick={
          openMode === "click" ? () => setOpen((v) => !v) : undefined
        }
      >
        {toggler}
      </div>

      {/* Menu */}
      {open && (
        <div className="absolute left-0 mt-0.5 w-56 rounded-sm border border-main-300 bg-main-200 shadow-lg">
          <DropdownList items={items} />
        </div>
      )}
    </div>
  );
}

/* =======================
   Internal Components
======================= */

type DropdownListProps = {
  items: DropdownItem[];
};

function DropdownList({ items }: DropdownListProps) {
  return (
    <ul className="py-1">
      {items.map((item, index) => (
        <DropdownItemRow key={index} item={item} />
      ))}
    </ul>
  );
}

type DropdownItemRowProps = {
  item: DropdownItem;
};

function DropdownItemRow({ item }: DropdownItemRowProps) {
  const hasSubItems = !!item.subItems?.length;

  return (
    <li className="relative">
      {/* Parent hover scope */}
      <div className="group">
        {/* Item */}
        <div
          onClick={item.onClick}
          className="flex items-center justify-between gap-3 px-4 py-2 text-sm hover:bg-main-300 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            {item.icon && (
              <span className="text-main-600">{item.icon}</span>
            )}
            <span>{item.label}</span>
          </div>

          {hasSubItems && (
            <span className="text-xs text-main-600"> <i className="bi bi-chevron-right" /></span>
          )}
        </div>

        {/* Submenu (ONLY opens when THIS item is hovered) */}
        {hasSubItems && (
          <div className="absolute top-0 left-full ml-0.5 hidden min-w-56 rounded-sm border border-main-300 bg-main-200 shadow-lg group-hover:block">
            <DropdownList items={item.subItems!} />
          </div>
        )}
      </div>
    </li>
  );
}

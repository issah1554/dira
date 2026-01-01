import { useState, type ReactNode } from "react";

/* =======================
   Types
======================= */

export type DropdownItem = {
  label: string;
  onClick?: () => void;
  href?: string;
  subItems?: DropdownItem[];
};

export type DropdownProps = {
  toggler: ReactNode;
  items: DropdownItem[];
};

/* =======================
   Public Component
======================= */

export function DropdownMenu({ toggler, items }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Toggler */}
      <div className="cursor-pointer">
        {toggler}
      </div>

      {/* Menu */}
      {open && (
        <div className="absolute left-0 mt-2 w-56 rounded-xl border bg-white shadow-lg">
          <DropdownList items={items} />
        </div>
      )}
    </div>
  );
}

/* =======================
   Internal Components
   (not exported)
======================= */

type DropdownListProps = {
  items: DropdownItem[];
  depth?: number;
};

function DropdownList({ items, depth = 0 }: DropdownListProps) {
  return (
    <ul className="py-1">
      {items.map((item, index) => (
        <DropdownListItem
          key={index}
          item={item}
          depth={depth}
        />
      ))}
    </ul>
  );
}

type DropdownListItemProps = {
  item: DropdownItem;
  depth: number;
};

function DropdownListItem({ item }: DropdownListItemProps) {
  const hasSubItems = !!item.subItems?.length;

  return (
    <li className="relative group">
      {/* Item */}
      <div
        onClick={item.onClick}
        className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
      >
        <span>{item.label}</span>
        {hasSubItems && (
          <span className="ml-2 text-xs">▶</span>
        )}
      </div>

      {/* Submenu */}
      {hasSubItems && (
        <div className="absolute top-0 left-full ml-1 hidden min-w-56 rounded-xl border bg-white shadow-lg group-hover:block">
          <DropdownList items={item.subItems!} />
        </div>
      )}
    </li>
  );
}

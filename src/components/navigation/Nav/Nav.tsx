/**
 * @file src/components/navigation/Nav/Nav.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Navigation component with active states and sub-items
 */
import React from "react";
import { clsx } from "clsx";
import type { IconType } from "react-icons";

export interface NavItem {
  name: string;
  href: string;
  icon?: IconType;
  active?: boolean;
  highlight?: boolean;
  subItems?: NavItem[];
}

export interface NavProps {
  items: NavItem[];
  onItemClick?: (item: NavItem) => void;
  className?: string;
}

export const Nav: React.FC<NavProps> = ({ items, onItemClick, className }) => {
  return (
    <nav className={clsx("space-y-2", className)}>
      {items.map((item) => (
        <div key={item.href} className="group">
          <a
            href={item.href}
            onClick={(e) => {
              if (onItemClick) {
                e.preventDefault();
                onItemClick(item);
              }
            }}
            className={clsx(
              "flex items-center py-2 px-4 rounded-lg transition-all duration-300",
              "no-underline font-bold uppercase tracking-wider text-sm",
              item.active
                ? "bg-brutal-black text-brutal-white transform -skew-x-6"
                : "text-brutal-black hover:bg-brutal-gray-100 hover:transform hover:-skew-x-6",
              item.highlight &&
                !item.active &&
                "text-brutal-pink border-2 border-brutal-pink",
            )}
          >
            {item.icon && (
              <item.icon className="mr-3 text-xl transition-transform duration-300 group-hover:rotate-12" />
            )}
            <span>{item.name}</span>
          </a>

          {/* Sub-items */}
          {item.subItems && item.subItems.length > 0 && (
            <div className="ml-6 mt-2 space-y-1">
              {item.subItems.map((subItem) => (
                <a
                  key={subItem.href}
                  href={subItem.href}
                  onClick={(e) => {
                    if (onItemClick) {
                      e.preventDefault();
                      onItemClick(subItem);
                    }
                  }}
                  className={clsx(
                    "flex items-center py-1 px-4 rounded-lg transition-all duration-300",
                    "no-underline text-xs uppercase tracking-wide",
                    subItem.active
                      ? "text-brutal-pink font-bold transform translate-x-2"
                      : "text-brutal-gray-600 hover:text-brutal-black hover:transform hover:translate-x-2",
                  )}
                >
                  {subItem.icon && <subItem.icon className="mr-2 text-sm" />}
                  <span>{subItem.name}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

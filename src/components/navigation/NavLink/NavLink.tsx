/**
 * @file src/components/navigation/NavLink/NavLink.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Navigation link component with active state
 */
import React from "react";
import { clsx } from "clsx";
import type { IconType } from "react-icons";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  icon?: IconType;
  external?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  active = false,
  icon: Icon,
  external = false,
  className,
  onClick,
}) => {
  const linkProps = external
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <a
      href={href}
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2 px-4 py-2",
        "font-bold uppercase tracking-wider text-sm",
        "transition-all duration-200",
        active
          ? ["bg-brutal-black text-brutal-white", "transform -skew-x-3"]
          : [
              "text-brutal-black hover:bg-brutal-gray-100",
              "hover:transform hover:-skew-x-3",
            ],
        className,
      )}
      {...linkProps}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </a>
  );
};

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brutal-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Menu */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-64 z-50",
          "bg-brutal-white border-l-4 border-brutal-black",
          "transform transition-transform duration-300",
          "shadow-brutal-xl",
          isOpen ? "translate-x-0" : "translate-x-full",
          className,
        )}
      >
        <div className="p-4 overflow-y-auto h-full">{children}</div>
      </div>
    </>
  );
};

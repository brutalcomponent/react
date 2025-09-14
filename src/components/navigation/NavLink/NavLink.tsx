/**
 * @file src/components/navigation/NavLink/NavLink.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Navigation link component with active state and optional icon
 */
import React from "react";
import { cn } from "../../../utils/cn.utils";
import type { IconType } from "react-icons";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  icon?: IconType;
  external?: boolean;
  brutal?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  accentColor?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  active = false,
  icon: Icon,
  external = false,
  brutal = true,
  className,
  onClick,
  accentColor = "brutal-pink",
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
      className={cn(
        "flex items-center gap-2 px-4 py-2",
        "font-black uppercase tracking-wider text-sm",
        "transition-all duration-200",
        active
          ? ["bg-brutal-black text-brutal-white", "transform -skew-x-3"]
          : [
              "text-brutal-black hover:bg-brutal-gray-100",
              brutal && "hover:transform hover:-skew-x-3",
            ],
        className,
      )}
      style={
        {
          "--accent-color": accentColor.startsWith("#")
            ? accentColor
            : `var(--brutal-${accentColor.replace("brutal-", "")})`,
        } as React.CSSProperties
      }
      {...linkProps}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </a>
  );
};

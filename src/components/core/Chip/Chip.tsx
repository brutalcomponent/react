/**
 * @file src/components/core/Chip/Chip.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Base chip component for tags and labels with brutal styling
 */
import React from "react";
import type { IconType } from "react-icons";
import { FaTimes } from "react-icons/fa";
import { Icon } from "../Icon";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface ChipProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "ghost";
  size?: "xs" | "sm" | "md" | "lg";
  icon?: IconType;
  iconPosition?: "left" | "right";
  onRemove?: () => void;
  onClick?: () => void;
  brutal?: boolean;
  selected?: boolean;
  disabled?: boolean;
  accentColor?: string;
  className?: string;
}

/**
 * @component Chip
 * @description Brutal chip component for tags, labels, and selections
 */
export const Chip: React.FC<ChipProps> = ({
  children,
  variant = "default",
  size = "sm",
  icon: IconComponent,
  iconPosition = "left",
  onRemove,
  onClick,
  brutal = true,
  selected = false,
  disabled = false,
  accentColor = "brutal-pink",
  className,
}) => {
  const Component = onClick ? "button" : "span";
  const sizeClasses = getSizeClasses(size);

  const iconSizes = {
    xs: "xs" as const,
    sm: "xs" as const,
    md: "sm" as const,
    lg: "sm" as const,
  };

  return (
    <Component
      className={cn(
        // Base styling
        "inline-flex items-center font-black uppercase tracking-wider",
        "transition-all duration-200",

        // Size classes
        sizeClasses.padding,
        sizeClasses.text,
        "gap-1.5",

        // Brutal styling
        brutal && [
          sizeClasses.border,
          "border-brutal-black",
          sizeClasses.shadow,
        ],
        !brutal && "border rounded-md",

        // Variant styling
        variant === "default" && "bg-brutal-gray-100 text-brutal-black",
        variant === "primary" && "bg-brutal-black text-brutal-white",
        variant === "secondary" && "bg-brutal-white text-brutal-black",
        variant === "success" && "bg-brutal-mint text-brutal-black",
        variant === "warning" && "bg-brutal-yellow text-brutal-black",
        variant === "danger" && "bg-brutal-coral text-brutal-black",
        variant === "ghost" &&
          "bg-transparent text-brutal-black border-brutal-black",

        // Selected state
        selected && [
          "bg-accent text-brutal-black",
          brutal && "shadow-brutal transform -rotate-1",
        ],

        // Interactive states
        onClick &&
          !disabled && [
            "cursor-pointer",
            brutal &&
              "hover:shadow-brutal-md hover:transform hover:-rotate-0.5",
            !brutal && "hover:shadow-md hover:scale-105",
          ],

        // Disabled state
        disabled && "opacity-50 cursor-not-allowed",

        className,
      )}
      onClick={!disabled ? onClick : undefined}
      disabled={Component === "button" ? disabled : undefined}
      style={
        {
          "--accent-color": accentColor.startsWith("#")
            ? accentColor
            : `var(--brutal-${accentColor.replace("brutal-", "")})`,
        } as React.CSSProperties
      }
    >
      {IconComponent && iconPosition === "left" && (
        <Icon icon={IconComponent} size={iconSizes[size]} />
      )}

      <span className="select-none">{children}</span>

      {IconComponent && iconPosition === "right" && !onRemove && (
        <Icon icon={IconComponent} size={iconSizes[size]} />
      )}

      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={cn(
            "ml-1 -mr-1 p-0.5 transition-colors duration-200",
            "hover:bg-brutal-black/10 rounded",
            brutal && "hover:bg-accent/20",
          )}
          aria-label="Remove chip"
        >
          <Icon icon={FaTimes} size="xs" />
        </button>
      )}
    </Component>
  );
};

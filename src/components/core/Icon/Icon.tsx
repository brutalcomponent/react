/**
 * @file src/components/core/Icon/Icon.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Icon wrapper for react-icons with consistent sizing and brutal effects
 */
import React from "react";
import { cn, getAccentClasses } from "../../../utils/cn.utils";
import type { IconProps } from "./types";

/**
 * @component Icon
 * @description Brutal icon wrapper with consistent sizing and optional effects
 */
export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = "md",
  className,
  spin = false,
  bounce = false,
  pulse = false,
  brutal = false,
  accentColor = "brutal-pink",
  ...props
}) => {
  const accentClasses = getAccentClasses(accentColor);

  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
    "2xl": "w-10 h-10",
  };

  return (
    <IconComponent
      className={cn(
        // Base sizing
        sizeClasses[size],

        // Animations
        spin && "animate-spin",
        bounce && "animate-bounce",
        pulse && "animate-pulse",

        // Brutal effects
        brutal && [
          "transition-all duration-200",
          "hover:scale-110 hover:-rotate-12",
          "transform-gpu will-change-transform",
        ],

        // Focus styles for accessibility
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 rounded-sm",

        className,
      )}
      style={
        {
          "--accent-color": accentColor.startsWith("#")
            ? accentColor
            : `var(--brutal-${accentColor.replace("brutal-", "")})`,
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

/**
 * @component BrutalIcon
 * @description Icon with brutal styling effects enabled by default
 */
export const BrutalIcon: React.FC<IconProps> = (props) => (
  <Icon
    {...props}
    brutal={true}
    className={cn("text-accent hover:text-brutal-black", props.className)}
  />
);

/**
 * @component SpinningIcon
 * @description Icon with spinning animation
 */
export const SpinningIcon: React.FC<IconProps> = (props) => (
  <Icon {...props} spin={true} />
);

/**
 * @component AnimatedIcon
 * @description Icon with multiple animation options
 */
export const AnimatedIcon: React.FC<
  IconProps & {
    animation?: "spin" | "bounce" | "pulse";
  }
> = ({ animation = "bounce", ...props }) => (
  <Icon
    {...props}
    spin={animation === "spin"}
    bounce={animation === "bounce"}
    pulse={animation === "pulse"}
  />
);

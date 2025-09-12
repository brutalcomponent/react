/**
 * @file src/components/core/Icon/Icon.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Icon wrapper for react-icons with consistent sizing
 */
import React from "react";
import { clsx } from "clsx";
import type { IconProps } from "./types";

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = "md",
  className,
  spin = false,
  ...props
}) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  return (
    <IconComponent
      className={clsx(sizeClasses[size], spin && "animate-spin", className)}
      {...props}
    />
  );
};

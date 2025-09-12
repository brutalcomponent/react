/**
 * @file src/components/core/Text/Text.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal text component with variants
 */
import React from "react";
import { clsx } from "clsx";
import type { TextProps } from "./types";

export const Text: React.FC<TextProps> = ({
  variant = "body",
  as: Component = "p",
  brutal = true,
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    body: "text-base text-brutal-gray-700",
    lead: "text-lg md:text-xl text-brutal-gray-600 font-semibold",
    small: "text-sm text-brutal-gray-600",
    mono: "text-sm font-mono text-brutal-gray-700",
  };

  return (
    <Component
      className={clsx(
        variantClasses[variant],
        brutal && variant === "body" && "leading-relaxed mb-4",
        brutal && variant === "lead" && "leading-relaxed mb-6",
        brutal && variant === "mono" && "tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

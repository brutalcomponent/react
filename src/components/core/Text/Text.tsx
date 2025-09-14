/**
 * @file src/components/core/Text/Text.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal text component with multiple variants and enhanced styling
 */
import React from "react";
import { cn, getSizeClasses, getAccentClasses } from "../../../utils/cn.utils";
import type { TextProps } from "./types";

/**
 * @component Text
 * @description Versatile text component with multiple variants and brutal styling options
 */
export const Text: React.FC<TextProps> = ({
  variant = "body",
  as: Component = "p",
  size = "md",
  weight = "normal",
  brutal = true,
  animated = false,
  accentColor = "brutal-pink",
  className,
  children,
  ...props
}) => {
  const sizeClasses = getSizeClasses(size);
  const accentClasses = getAccentClasses(accentColor);

  const getVariantClasses = () => {
    switch (variant) {
      case "lead":
        return cn(
          "text-lg md:text-xl text-brutal-gray-600 font-semibold leading-relaxed",
          brutal && "mb-6",
        );

      case "small":
        return "text-sm text-brutal-gray-600";

      case "caption":
        return "text-xs text-brutal-gray-500 uppercase tracking-wider font-bold";

      case "mono":
        return "font-mono text-brutal-gray-700 tracking-tight";

      case "muted":
        return "text-brutal-gray-500";

      case "accent":
        return "text-accent font-bold";

      case "error":
        return "text-brutal-coral font-bold";

      case "success":
        return "text-brutal-mint font-bold";

      case "warning":
        return "text-brutal-yellow font-bold";

      default: // body
        return cn("text-brutal-gray-700", brutal && "leading-relaxed mb-4");
    }
  };

  const getWeightClasses = () => {
    const weights = {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      black: "font-black",
    };
    return weights[weight];
  };

  return (
    <Component
      className={cn(
        // Base text styling
        getVariantClasses(),
        getWeightClasses(),

        // Size classes (for non-variant specific sizing)
        variant === "body" && sizeClasses.text,

        // Animation
        animated && [
          "transition-all duration-300",
          "hover:text-accent hover:transform hover:-skew-x-1",
        ],

        // Focus styles for interactive text
        Component === "button" && [
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 rounded-sm",
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
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * @component BrutalText
 * @description Text component with extreme brutal styling
 */
export const BrutalText: React.FC<Omit<TextProps, "brutal">> = (props) => (
  <Text
    {...props}
    brutal={true}
    animated={true}
    className={cn(
      "transform -rotate-1 hover:rotate-0 hover:scale-105",
      "hover:drop-shadow-sm",
      props.className,
    )}
  />
);

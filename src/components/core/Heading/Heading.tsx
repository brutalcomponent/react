/**
 * @file src/components/core/Heading/Heading.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Enhanced brutal heading component with multiple variants and effects
 */
import React from "react";
import { cn, brutalBase, getAccentClasses } from "../../../utils/cn.utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "display" | "title" | "section" | "subsection" | "hero";
  skew?: boolean | "left" | "right";
  uppercase?: boolean;
  brutal?: boolean;
  underline?: boolean;
  gradient?: boolean;
  animated?: boolean;
  accentColor?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

/**
 * @component Heading
 * @description Brutal heading component with multiple styling options and effects
 */
export const Heading: React.FC<HeadingProps> = ({
  as: Component = "h2",
  variant,
  skew = false,
  uppercase = true,
  brutal = true,
  underline = false,
  gradient = false,
  animated = false,
  accentColor = "brutal-pink",
  size,
  className,
  children,
  ...props
}) => {
  const accentClasses = getAccentClasses(accentColor);

  const getVariantClasses = () => {
    if (size) {
      const sizeClasses = {
        xs: "text-sm md:text-base",
        sm: "text-lg md:text-xl",
        md: "text-xl md:text-2xl",
        lg: "text-2xl md:text-3xl",
        xl: "text-3xl md:text-4xl",
        "2xl": "text-4xl md:text-5xl",
      };
      return sizeClasses[size];
    }

    if (variant) {
      const variantClasses = {
        hero: "text-6xl md:text-7xl lg:text-8xl xl:text-9xl",
        display: "text-5xl md:text-6xl lg:text-7xl",
        title: "text-4xl md:text-5xl lg:text-6xl",
        section: "text-2xl md:text-3xl lg:text-4xl",
        subsection: "text-xl md:text-2xl lg:text-3xl",
      };
      return variantClasses[variant];
    }

    // Default size based on semantic tag
    const tagClasses = {
      h1: "text-5xl md:text-6xl",
      h2: "text-4xl md:text-5xl",
      h3: "text-3xl md:text-4xl",
      h4: "text-2xl md:text-3xl",
      h5: "text-xl md:text-2xl",
      h6: "text-lg md:text-xl",
    };
    return tagClasses[Component];
  };

  return (
    <Component
      className={cn(
        // Base typography
        "font-black text-brutal-black leading-tight",
        getVariantClasses(),

        // Text styling
        uppercase && "uppercase tracking-wider",

        // Brutal spacing
        brutal && "mb-4",

        // Transform effects
        skew === true && "transform -skew-x-2",
        skew === "left" && "transform -skew-x-2",
        skew === "right" && "transform skew-x-2",

        // Underline effect
        underline && [
          "border-b-4 pb-2 inline-block",
          gradient ? accentClasses.border : "border-brutal-black",
        ],

        // Gradient effect
        gradient && [
          "bg-gradient-to-r from-brutal-black via-accent to-brutal-black",
          "bg-clip-text text-transparent",
          "bg-[length:200%_100%]",
        ],

        // Animation effects
        animated && [
          "transition-all duration-300 ease-out",
          "hover:scale-105 hover:-rotate-1",
          gradient && "hover:bg-[position:100%_0%]",
        ],

        // Focus styles for accessibility
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",

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
 * @component AnimatedHeading
 * @description Heading with enhanced hover animations and effects
 */
export const AnimatedHeading: React.FC<HeadingProps> = (props) => (
  <Heading
    {...props}
    animated={true}
    className={cn(
      // Enhanced animations
      "hover:shadow-brutal-sm",
      "transform-gpu will-change-transform",
      props.className,
    )}
  />
);

/**
 * @component GradientHeading
 * @description Heading with gradient text effect
 */
export const GradientHeading: React.FC<HeadingProps> = (props) => (
  <Heading
    {...props}
    gradient={true}
    animated={true}
    className={cn("hover:scale-110", props.className)}
  />
);

/**
 * @component HeroHeading
 * @description Large hero heading with dramatic effects
 */
export const HeroHeading: React.FC<Omit<HeadingProps, "variant">> = (props) => (
  <Heading
    {...props}
    variant="hero"
    skew="left"
    animated={true}
    className={cn("text-center", "drop-shadow-lg", props.className)}
  />
);

/**
 * @file src/components/core/Heading/Heading.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Enhanced heading component
 */
import React from "react";
import { clsx } from "clsx";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "display" | "title" | "section" | "subsection";
  skew?: boolean | "left" | "right";
  uppercase?: boolean;
  brutal?: boolean;
  underline?: boolean;
  gradient?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  as: Component = "h2",
  variant,
  skew = false,
  uppercase = true,
  brutal = true,
  underline = false,
  gradient = false,
  className,
  children,
  ...props
}) => {
  const getVariantClasses = () => {
    if (!variant) {
      // Default size based on tag
      const sizeClasses = {
        h1: "text-5xl md:text-6xl",
        h2: "text-4xl md:text-5xl",
        h3: "text-3xl md:text-4xl",
        h4: "text-2xl md:text-3xl",
        h5: "text-xl md:text-2xl",
        h6: "text-lg md:text-xl",
      };
      return sizeClasses[Component];
    }

    const variantClasses = {
      display: "text-6xl md:text-7xl lg:text-8xl",
      title: "text-4xl md:text-5xl lg:text-6xl",
      section: "text-2xl md:text-3xl",
      subsection: "text-xl md:text-2xl",
    };
    return variantClasses[variant];
  };

  return (
    <Component
      className={clsx(
        "font-black text-brutal-black",
        getVariantClasses(),
        uppercase && "uppercase tracking-wider",
        brutal && "mb-4",
        skew === true && "transform -skew-x-2",
        skew === "left" && "transform -skew-x-2",
        skew === "right" && "transform skew-x-2",
        underline && "border-b-4 border-brutal-black pb-2 inline-block",
        gradient &&
          "bg-gradient-to-r from-brutal-black to-brutal-pink bg-clip-text text-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * @component AnimatedHeading
 * @description Heading with hover animation
 */
export const AnimatedHeading: React.FC<HeadingProps> = (props) => (
  <Heading
    {...props}
    className={clsx(
      "transition-all duration-300",
      "hover:transform hover:scale-105 hover:-rotate-1",
      props.className,
    )}
  />
);

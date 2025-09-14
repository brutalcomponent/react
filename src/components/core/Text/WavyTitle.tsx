/**
 * @file src/components/core/Text/WavyTitle.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Animated wavy title component with enhanced effects
 * @client This component requires client-side JavaScript for animations
 */
"use client";

import React, { useState, useEffect } from "react";
import { cn, getAccentClasses } from "../../../utils/cn.utils";

export interface WavyTitleProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  animate?: boolean;
  stagger?: boolean;
  brutal?: boolean;
  accentColor?: string;
  className?: string;
}

/**
 * @component WavyTitle
 * @description Animated title with wavy letter effects and brutal styling
 */
export const WavyTitle: React.FC<WavyTitleProps> = ({
  children,
  as: Component = "h1",
  size = "xl",
  animate = true,
  stagger = true,
  brutal = true,
  accentColor = "brutal-pink",
  className,
}) => {
  const [isClient, setIsClient] = useState(false);
  const letters = children.split("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getSizeClasses = () => {
    const sizes = {
      sm: "text-2xl md:text-3xl",
      md: "text-3xl md:text-4xl",
      lg: "text-4xl md:text-5xl",
      xl: "text-5xl md:text-6xl",
      "2xl": "text-6xl md:text-7xl lg:text-8xl",
    };
    return sizes[size];
  };

  return (
    <Component
      className={cn(
        // Base styling
        "font-black text-brutal-black uppercase tracking-wider",
        "flex flex-wrap justify-center items-center",
        getSizeClasses(),

        // Brutal spacing
        brutal && "mb-8",

        className,
      )}
      style={
        {
          "--accent-color": accentColor.startsWith("#")
            ? accentColor
            : `var(--brutal-${accentColor.replace("brutal-", "")})`,
        } as React.CSSProperties
      }
    >
      {letters.map((letter, index) => (
        <span
          key={index}
          className={cn(
            "inline-block transition-all duration-300",
            "hover:text-accent hover:scale-110",

            // Brutal effects
            brutal && [
              "hover:transform hover:-rotate-3 hover:translate-y-1",
              "hover:drop-shadow-lg",
            ],

            // Animation
            animate && isClient && "animate-wave",

            // Focus styles for accessibility
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm",
          )}
          style={{
            animationDelay:
              animate && stagger && isClient ? `${index * 0.1}s` : undefined,
          }}
          tabIndex={0}
          role="presentation"
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </Component>
  );
};

/**
 * @component GlitchTitle
 * @description Title with glitch effect animation
 */
export const GlitchTitle: React.FC<Omit<WavyTitleProps, "animate">> = (
  props,
) => (
  <WavyTitle
    {...props}
    animate={true}
    className={cn(
      "relative",
      "before:content-[attr(data-text)] before:absolute before:top-0 before:left-0 before:w-full before:h-full",
      "before:text-accent before:opacity-80 before:animate-pulse",
      "after:content-[attr(data-text)] after:absolute after:top-0 after:left-0 after:w-full after:h-full",
      "after:text-brutal-coral after:opacity-60 after:animate-bounce",
      props.className,
    )}
  />
);

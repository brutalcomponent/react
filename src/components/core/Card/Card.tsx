/**
 * @file src/components/core/Card/Card.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal card component with multiple variants
 */
import React from "react";
import { clsx } from "clsx";
import { CardSkeleton } from "./CardSkeleton";
import type { CardProps } from "./types";

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "raised",
      brutal = true,
      hover = true,
      rotate = false,
      accent,
      skeleton = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    if (skeleton) {
      return <CardSkeleton className={className} />;
    }

    return (
      <div
        ref={ref}
        className={clsx(
          // Base
          "p-6 transition-all duration-300",

          // Variants
          variant === "flat" && "bg-brutal-white",
          variant === "raised" && "bg-brutal-white shadow-brutal",
          variant === "sunken" && "bg-brutal-gray-100",
          variant === "bordered" &&
            "bg-brutal-white border-4 border-brutal-black",

          // Brutal mode
          brutal && variant === "raised" && "border-4 border-brutal-black",
          brutal &&
            hover &&
            "hover:shadow-brutal-md hover:-translate-x-0.5 hover:-translate-y-0.5",

          // Rotation
          rotate === true && "transform -rotate-1 hover:rotate-0",
          rotate === "left" && "transform -rotate-1 hover:rotate-0",
          rotate === "right" && "transform rotate-1 hover:rotate-0",

          // Accent border
          accent === "pink" && "border-l-8 !border-l-brutal-pink",
          accent === "mint" && "border-l-8 !border-l-brutal-mint",
          accent === "sky" && "border-l-8 !border-l-brutal-sky",
          accent === "lavender" && "border-l-8 !border-l-brutal-lavender",
          accent === "peach" && "border-l-8 !border-l-brutal-peach",
          accent === "coral" && "border-l-8 !border-l-brutal-coral",
          accent === "yellow" && "border-l-8 !border-l-brutal-yellow",

          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

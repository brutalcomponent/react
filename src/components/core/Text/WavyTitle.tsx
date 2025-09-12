/**
 * @file src/components/core/Text/WavyTitle.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Animated wavy title component
 */
import React from "react";
import { clsx } from "clsx";

export interface WavyTitleProps {
  children: string;
  className?: string;
  animate?: boolean;
}

export const WavyTitle: React.FC<WavyTitleProps> = ({
  children,
  className,
  animate = true,
}) => {
  const letters = children.split("");

  return (
    <h1
      className={clsx(
        "text-5xl md:text-6xl font-black text-brutal-black uppercase tracking-wider mb-8",
        "flex flex-wrap justify-center",
        className,
      )}
    >
      {letters.map((letter, index) => (
        <span
          key={index}
          className={clsx(
            "inline-block transform hover:text-brutal-pink transition-all duration-200",
            animate && "animate-wave",
          )}
          style={{
            animationDelay: animate ? `${index * 0.05}s` : undefined,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </h1>
  );
};

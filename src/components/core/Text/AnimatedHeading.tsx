/**
 * @file src/components/core/Text/AnimatedHeading.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Heading with hover animation effects
 */
import React from "react";
import { clsx } from "clsx";
import { Heading } from "./Heading";
import type { HeadingProps } from "./types";

export const AnimatedHeading: React.FC<HeadingProps> = (props) => {
  return (
    <Heading
      {...props}
      className={clsx(
        "transition-all duration-300",
        "hover:transform hover:scale-105 hover:-rotate-1",
        "hover:text-brutal-pink",
        props.className,
      )}
    />
  );
};

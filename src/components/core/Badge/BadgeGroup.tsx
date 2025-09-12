/**
 * @file src/components/core/Badge/BadgeGroup.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Group of badges
 */
import React from "react";
import { clsx } from "clsx";
import type { BadgeGroupProps } from "./types";

export const BadgeGroup: React.FC<BadgeGroupProps> = ({
  children,
  className,
}) => <div className={clsx("flex flex-wrap gap-2", className)}>{children}</div>;

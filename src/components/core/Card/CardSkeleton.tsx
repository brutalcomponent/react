/**
 * @file src/components/core/Card/CardSkeleton.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Skeleton loader for Card
 */
import React from "react";
import { clsx } from "clsx";
import type { CardSkeletonProps } from "./types";

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ className }) => (
  <div
    className={clsx(
      "p-6 bg-brutal-white border-4 border-brutal-black shadow-brutal animate-pulse",
      className,
    )}
  >
    <div className="h-6 bg-brutal-gray-200 rounded w-3/4 mb-4" />
    <div className="space-y-3">
      <div className="h-4 bg-brutal-gray-200 rounded" />
      <div className="h-4 bg-brutal-gray-200 rounded w-5/6" />
      <div className="h-4 bg-brutal-gray-200 rounded w-4/6" />
    </div>
  </div>
);

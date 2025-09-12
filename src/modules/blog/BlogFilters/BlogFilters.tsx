/**
 * @file src/modules/blog/BlogFilters/BlogFilters.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * A specific implementation of FilterControls for blog posts.
 * @client This component requires client-side JavaScript
 */
"use client";

import React from "react";
import {
  FilterControls,
  FilterControlsProps,
} from "@/components/patterns/FilterControls/FilterControls";

// Define the specific sort options for the blog
const blogSortOptions = [
  { value: "newest", label: "Sort: Newest" },
  { value: "oldest", label: "Sort: Oldest" },
  { value: "most-views", label: "Sort: Popular" },
];

export const BlogFilters: React.FC<Omit<FilterControlsProps, "sortOptions">> = (
  props,
) => {
  return <FilterControls {...props} sortOptions={blogSortOptions} />;
};

export type { FilterControlsProps as BlogFiltersProps } from "@/components/patterns/FilterControls/FilterControls";

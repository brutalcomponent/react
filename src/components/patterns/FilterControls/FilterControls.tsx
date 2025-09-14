/**
 * @file src/components/patterns/FilterControls/FilterControls.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * A generic, reusable set of controls for searching, sorting, and filtering data.
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useMemo, useCallback } from "react";
import { cn, getSizeClasses } from "../../../utils/cn.utils";
import { Input, Select } from "../../core/Input";
import { Button } from "../../core/Button";
import { Icon, FaSearch, FaFilter, FaTimes } from "../../core/Icon";

export interface SortOption {
  value: string;
  label: string;
}

export interface FilterDefinition {
  key: string;
  label: string;
  options: Array<{ value: string; label: string }>;
}

export interface FilterValues {
  search: string;
  sort: string;
  filters: Record<string, string>;
}

export interface FilterControlsProps {
  onApplyFilters: (values: FilterValues) => void;
  sortOptions: SortOption[];
  filterDefinitions?: FilterDefinition[];
  resultsCount?: number;
  totalCount?: number;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  accentColor?: string;
  className?: string;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  onApplyFilters,
  sortOptions,
  filterDefinitions = [],
  resultsCount,
  totalCount,
  brutal = true,
  size = "md",
  accentColor = "brutal-pink",
  className,
}) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(sortOptions[0]?.value || "");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {},
  );
  const [showFilters, setShowFilters] = useState(false);

  const sizeClasses = getSizeClasses(size);

  const hasActiveFilters = useMemo(() => {
    return Boolean(search) || Object.values(activeFilters).some((v) => v);
  }, [search, activeFilters]);

  const handleApply = useCallback(() => {
    onApplyFilters({ search, sort: sortBy, filters: activeFilters });
  }, [onApplyFilters, search, sortBy, activeFilters]);

  const handleClear = useCallback(() => {
    const resetSort = sortOptions[0]?.value || "";
    setSearch("");
    setSortBy(resetSort);
    setActiveFilters({});
    onApplyFilters({
      search: "",
      sort: resetSort,
      filters: {},
    });
  }, [onApplyFilters, sortOptions]);

  return (
    <div
      className={cn("space-y-4", className)}
      style={
        {
          "--accent-color": accentColor.startsWith("#")
            ? accentColor
            : `var(--brutal-${accentColor.replace("brutal-", "")})`,
        } as React.CSSProperties
      }
    >
      {/* Search Bar */}
      <Input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleApply()}
        leftIcon={FaSearch}
        brutal={brutal}
        size={size}
        accentColor={accentColor}
        aria-label="Search"
      />

      {/* Controls Row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Sort Dropdown */}
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          options={sortOptions}
          brutal={brutal}
          size={size}
          accentColor={accentColor}
          className="flex-shrink-0"
          aria-label="Sort by"
        />

        {/* Filter Toggle */}
        {filterDefinitions.length > 0 && (
          <Button
            variant="secondary"
            size={size}
            onClick={() => setShowFilters((v) => !v)}
            leftIcon={() => <FaFilter />}
            brutal={brutal}
            aria-pressed={showFilters}
            aria-label="Toggle filters"
            className={cn(
              showFilters &&
                "bg-brutal-black text-brutal-white border-brutal-black",
            )}
          >
            Filters
          </Button>
        )}

        <Button
          variant="primary"
          size={size}
          onClick={handleApply}
          brutal={brutal}
          aria-label="Apply filters"
        >
          Apply
        </Button>

        {hasActiveFilters && (
          <Button
            variant="danger"
            size={size}
            onClick={handleClear}
            leftIcon={() => <FaTimes />}
            brutal={brutal}
            aria-label="Clear filters"
          >
            Clear
          </Button>
        )}

        {/* Results Count */}
        {resultsCount !== undefined && totalCount !== undefined && (
          <div
            className={cn(
              "ml-auto font-mono text-brutal-gray-600",
              sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
            )}
          >
            Showing {resultsCount} of {totalCount}
          </div>
        )}
      </div>

      {/* Expanded Filters */}
      {showFilters && filterDefinitions.length > 0 && (
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4",
            brutal
              ? "bg-brutal-gray-50 border-2 border-dashed border-brutal-black"
              : "bg-brutal-gray-50 rounded-lg border",
          )}
          role="region"
          aria-label="Additional filters"
        >
          {filterDefinitions.map((filter) => (
            <Select
              key={filter.key}
              label={filter.label}
              value={activeFilters[filter.key] || ""}
              onChange={(e) =>
                setActiveFilters((prev) => ({
                  ...prev,
                  [filter.key]: e.target.value,
                }))
              }
              options={[
                { label: `All ${filter.label}`, value: "" },
                ...filter.options,
              ]}
              brutal={brutal}
              size={size}
              accentColor={accentColor}
              aria-label={`Filter by ${filter.label}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

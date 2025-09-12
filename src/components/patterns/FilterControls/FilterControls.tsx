/**
 * @file src/components/patterns/FilterControls/FilterControls.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * A generic, reusable set of controls for searching, sorting, and filtering data.
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useMemo } from "react";
import { clsx } from "clsx";
import { Input } from "../../core/Input";
import { Select } from "../../core/Input";
import { Button } from "../../core/Button";
import { Icon, FaSearch, FaSort, FaFilter, FaTimes } from "../../core/Icon";

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
  className?: string;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  onApplyFilters,
  sortOptions,
  filterDefinitions = [],
  resultsCount,
  totalCount,
  brutal = true,
  className,
}) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(sortOptions[0]?.value || "");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {},
  );
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = useMemo(() => {
    return search || Object.values(activeFilters).some((v) => v);
  }, [search, activeFilters]);

  const handleApply = () => {
    onApplyFilters({ search, sort: sortBy, filters: activeFilters });
  };

  const handleClear = () => {
    setSearch("");
    setSortBy(sortOptions[0]?.value || "");
    setActiveFilters({});
    onApplyFilters({
      search: "",
      sort: sortOptions[0]?.value || "",
      filters: {},
    });
  };

  return (
    <div className={clsx("space-y-4", className)}>
      {/* Search Bar */}
      <Input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleApply()}
        leftIcon={FaSearch}
        brutal={brutal}
      />

      {/* Controls Row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Sort Dropdown */}
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          options={sortOptions}
          brutal={brutal}
          className="flex-shrink-0"
        />

        {/* Filter Toggle */}
        {filterDefinitions.length > 0 && (
          <Button
            variant="secondary"
            size="md"
            onClick={() => setShowFilters(!showFilters)}
            leftIcon={() => <FaFilter />}
            brutal={brutal}
            className={showFilters ? "bg-brutal-black text-brutal-white" : ""}
          >
            Filters
          </Button>
        )}

        <Button
          variant="primary"
          size="md"
          onClick={handleApply}
          brutal={brutal}
        >
          Apply
        </Button>

        {hasActiveFilters && (
          <Button
            variant="danger"
            size="md"
            onClick={handleClear}
            leftIcon={() => <FaTimes />}
            brutal={brutal}
          >
            Clear
          </Button>
        )}

        {/* Results Count */}
        {resultsCount !== undefined && totalCount !== undefined && (
          <div className="flex-1 text-right font-mono text-xs text-brutal-gray-600">
            Showing {resultsCount} of {totalCount}
          </div>
        )}
      </div>

      {/* Expanded Filters */}
      {showFilters && filterDefinitions.length > 0 && (
        <div
          className={clsx(
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4",
            brutal
              ? "bg-brutal-gray-50 border-2 border-dashed border-brutal-black"
              : "bg-brutal-gray-50 rounded-lg",
          )}
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

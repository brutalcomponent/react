/**
 * @file src/components/core/Table/Table.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal table component for data display with sorting, pagination, and filtering
 * @client
 */
"use client";
import React, { useState, useMemo } from "react";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { Icon } from "../Icon";
import { Input } from "../Input";
import { cn, getSizeClasses, getAccentClasses } from "../../../utils/cn.utils";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: any, item: T, index: number) => React.ReactNode;
  width?: string;
  minWidth?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  searchable?: boolean;
  className?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T, index: number) => void;
  loading?: boolean;
  emptyMessage?: string;
  searchable?: boolean;
  sortable?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "striped" | "bordered" | "minimal";
  brutal?: boolean;
  animated?: boolean;
  accentColor?: string;
  className?: string;
}

/**
 * @component Table
 * @description Brutal table component with comprehensive data display features
 */
export function Table<T extends { id?: string | number }>({
  data,
  columns,
  onRowClick,
  loading = false,
  emptyMessage = "No data available",
  searchable = false,
  sortable = false,
  pagination,
  size = "md",
  variant = "default",
  brutal = true,
  animated = true,
  accentColor = "brutal-pink",
  className,
}: TableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const sizeClasses = getSizeClasses(size);

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  };

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return data;

    return data.filter((item) =>
      columns.some((column) => {
        if (!column.searchable) return false;
        const value = getNestedValue(item, String(column.key));
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      }),
    );
  }, [data, searchTerm, columns, searchable]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    setSortConfig((current) => {
      if (current?.key === columnKey) {
        if (current.direction === "asc") {
          return { key: columnKey, direction: "desc" };
        } else {
          return null; // Remove sort
        }
      }
      return { key: columnKey, direction: "asc" };
    });
  };

  const getSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return FaSort;
    }
    return sortConfig.direction === "asc" ? FaSortUp : FaSortDown;
  };

  const getCellPadding = () => {
    const paddings = {
      xs: "px-2 py-1",
      sm: "px-3 py-2",
      md: "px-4 py-3",
      lg: "px-6 py-4",
    };
    return paddings[size];
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "striped":
        return {
          table: "",
          row: "even:bg-brutal-gray-50",
          header: "bg-brutal-black text-brutal-white",
        };

      case "bordered":
        return {
          table: "border-collapse",
          row: "border-b border-brutal-gray-300",
          header:
            "bg-brutal-gray-200 text-brutal-black border-b-2 border-brutal-black",
        };

      case "minimal":
        return {
          table: "",
          row: "border-b border-brutal-gray-200",
          header:
            "bg-transparent text-brutal-black border-b-2 border-brutal-gray-300",
        };

      default:
        return {
          table: "",
          row: "border-b-2 border-brutal-gray-200",
          header: "bg-brutal-black text-brutal-white",
        };
    }
  };

  const variantStyles = getVariantClasses();

  return (
    <div
      className={cn("w-full", className)}
      style={
        {
          "--accent-color": accentColor.startsWith("#")
            ? accentColor
            : `var(--brutal-${accentColor.replace("brutal-", "")})`,
        } as React.CSSProperties
      }
    >
      {/* Search bar */}
      {searchable && (
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search table..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={FaSearch}
            brutal={brutal}
            size={size}
            accentColor={accentColor}
            className="max-w-sm"
          />
        </div>
      )}

      {/* Table container */}
      <div
        className={cn(
          "overflow-x-auto",
          brutal && [
            "border-4 border-brutal-black shadow-brutal",
            animated && "hover:shadow-brutal-md transition-shadow duration-300",
          ],
          !brutal && "border rounded-lg shadow-lg overflow-hidden",
        )}
      >
        <table className={cn("w-full", variantStyles.table)}>
          {/* Header */}
          <thead>
            <tr className={cn(variantStyles.header)}>
              {columns.map((column) => {
                const isSortable = sortable && column.sortable !== false;
                const SortIcon = getSortIcon(String(column.key));

                return (
                  <th
                    key={String(column.key)}
                    className={cn(
                      // Base header styling
                      getCellPadding(),
                      "font-black uppercase tracking-wider",
                      sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",

                      // Alignment
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right",
                      !column.align && "text-left",

                      // Sortable styling
                      isSortable && [
                        "cursor-pointer select-none",
                        "hover:bg-brutal-gray-800 transition-colors duration-200",
                      ],

                      // Custom classes
                      column.className,
                    )}
                    style={{
                      width: column.width,
                      minWidth: column.minWidth,
                    }}
                    onClick={() => isSortable && handleSort(String(column.key))}
                    aria-sort={
                      sortConfig?.key === String(column.key)
                        ? sortConfig.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <div className="flex items-center gap-2 justify-between">
                      <span className="truncate">{column.label}</span>
                      {isSortable && (
                        <Icon
                          icon={SortIcon}
                          size="xs"
                          className={cn(
                            "flex-shrink-0 transition-colors duration-200",
                            sortConfig?.key === String(column.key)
                              ? "text-accent"
                              : "text-brutal-gray-400",
                          )}
                        />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-accent border-t-transparent rounded-full" />
                    <span className="font-mono text-brutal-gray-600">
                      Loading...
                    </span>
                  </div>
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-8 text-center text-brutal-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon
                      icon={FaFilter}
                      size="lg"
                      className="text-brutal-gray-300"
                    />
                    <p className="font-mono uppercase">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((item, index) => (
                <tr
                  key={item.id || index}
                  className={cn(
                    // Base row styling
                    variantStyles.row,
                    "transition-all duration-200",

                    // Interactive styling
                    onRowClick && [
                      "cursor-pointer",
                      "hover:bg-accent/10 hover:scale-[1.01]",
                      brutal && animated && "hover:shadow-brutal-sm",
                    ],

                    // Animation
                    animated && "animate-fade-in",
                  )}
                  onClick={() => onRowClick?.(item, index)}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {columns.map((column) => {
                    const value = getNestedValue(item, String(column.key));
                    return (
                      <td
                        key={String(column.key)}
                        className={cn(
                          // Base cell styling
                          getCellPadding(),
                          "font-mono",
                          sizeClasses.text,

                          // Alignment
                          column.align === "center" && "text-center",
                          column.align === "right" && "text-right",
                          !column.align && "text-left",

                          // Custom classes
                          column.className,
                        )}
                      >
                        <div className="truncate">
                          {column.render
                            ? column.render(value, item, index)
                            : String(value || "")}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-brutal-gray-600 font-mono">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)}{" "}
            of {pagination.total} results
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className={cn(
                "px-3 py-1 font-black uppercase tracking-wider",
                "border-2 border-brutal-black bg-brutal-white",
                "hover:bg-brutal-gray-100 transition-colors duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                brutal && "shadow-brutal-sm hover:shadow-brutal",
                sizeClasses.text,
              )}
            >
              Previous
            </button>

            <span className="px-3 py-1 font-mono text-sm">
              Page {pagination.page}
            </span>

            <button
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={
                pagination.page * pagination.pageSize >= pagination.total
              }
              className={cn(
                "px-3 py-1 font-black uppercase tracking-wider",
                "border-2 border-brutal-black bg-brutal-white",
                "hover:bg-brutal-gray-100 transition-colors duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                brutal && "shadow-brutal-sm hover:shadow-brutal",
                sizeClasses.text,
              )}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

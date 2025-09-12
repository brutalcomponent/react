/**
 * @file src/components/core/Table/Table.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal table component for data display
 */
import React from "react";
import { clsx } from "clsx";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  className?: string;
  brutal?: boolean;
}

export function Table<T extends { id?: string | number }>({
  data,
  columns,
  onRowClick,
  className,
  brutal = true,
}: TableProps<T>) {
  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  };

  return (
    <div
      className={clsx(
        "overflow-x-auto",
        brutal && "border-4 border-brutal-black shadow-brutal",
        className,
      )}
    >
      <table className="w-full">
        <thead>
          <tr className="bg-brutal-black text-brutal-white">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={clsx(
                  "px-4 py-3 text-xs font-black uppercase tracking-wider",
                  column.align === "center" && "text-center",
                  column.align === "right" && "text-right",
                  column.align === "left" && "text-left",
                  !column.align && "text-left",
                )}
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id || index}
              className={clsx(
                "border-b-2 border-brutal-gray-200",
                "hover:bg-brutal-gray-50 transition-colors",
                onRowClick && "cursor-pointer",
              )}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column) => {
                const value = getNestedValue(item, String(column.key));
                return (
                  <td
                    key={String(column.key)}
                    className={clsx(
                      "px-4 py-3 text-sm font-mono",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right",
                      column.align === "left" && "text-left",
                    )}
                  >
                    {column.render ? column.render(value, item) : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="p-8 text-center text-brutal-gray-500">
          <p className="font-mono uppercase">No data available</p>
        </div>
      )}
    </div>
  );
}

/**
 * @component TableSkeleton
 * @description Skeleton loader for Table
 */
export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 4,
}) => (
  <div className="border-4 border-brutal-black shadow-brutal overflow-hidden">
    <div className="bg-brutal-black p-4">
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 bg-brutal-gray-700 rounded flex-1" />
        ))}
      </div>
    </div>
    <div className="p-4 space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: columns }).map((_, j) => (
            <div
              key={j}
              className="h-4 bg-brutal-gray-200 rounded flex-1 animate-pulse"
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

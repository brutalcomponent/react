/**
 * @file src/components/navigation/TagFilter/TagFilter.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Generic tag filter component for any content type
 */
import React from "react";
import { FaTag, FaTimes } from "react-icons/fa";
import { Icon } from "../../core/Icon";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagDeselect?: (tag: string) => void;
  onClear?: () => void;
  multiSelect?: boolean;
  showCount?: boolean;
  tagCounts?: Record<string, number>;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  accentColor?: string;
  className?: string;
}

export const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTags,
  onTagSelect,
  onTagDeselect,
  onClear,
  multiSelect = false,
  showCount = false,
  tagCounts,
  brutal = true,
  size = "md",
  accentColor = "brutal-pink",
  className,
}) => {
  const sizeClasses = getSizeClasses(size);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      if (multiSelect && onTagDeselect) {
        onTagDeselect(tag);
      } else if (!multiSelect) {
        onTagSelect("");
      }
    } else {
      onTagSelect(tag);
    }
  };

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
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          const count = tagCounts?.[tag];

          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={cn(
                "px-4 py-2 font-black uppercase tracking-wider",
                sizeClasses.text,
                "transition-all duration-200",
                brutal
                  ? "border-2 border-brutal-black"
                  : "border border-brutal-gray-300 rounded",
                isSelected
                  ? [
                      "bg-brutal-black text-brutal-white",
                      brutal && "shadow-brutal transform -rotate-2",
                    ]
                  : [
                      "bg-brutal-white text-brutal-black",
                      "hover:bg-brutal-gray-100",
                      brutal &&
                        "hover:shadow-brutal hover:transform hover:-rotate-1",
                    ],
              )}
              aria-pressed={isSelected}
            >
              <Icon icon={FaTag} size="xs" className="inline mr-2" />
              {tag}
              {showCount && count !== undefined && (
                <span className="ml-2 text-xs opacity-75">({count})</span>
              )}
            </button>
          );
        })}
      </div>

      {selectedTags.length > 0 && onClear && (
        <button
          onClick={onClear}
          className={cn(
            "flex items-center gap-2",
            "font-black uppercase tracking-wider",
            sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
            "text-brutal-gray-600 hover:text-brutal-black transition-colors",
          )}
        >
          <Icon icon={FaTimes} size="sm" />
          Clear filters
        </button>
      )}
    </div>
  );
};

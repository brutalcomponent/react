/**
 * @file src/components/navigation/TagFilter/TagFilter.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Generic tag filter component for any content type
 */
import React from "react";
import { clsx } from "clsx";
import { FaTag, FaTimes } from "react-icons/fa";
import { Icon } from "../../core/Icon";

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
  className,
}) => {
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      if (multiSelect && onTagDeselect) {
        onTagDeselect(tag);
      } else if (!multiSelect) {
        // In single select, clicking selected tag clears it
        onTagSelect("");
      }
    } else {
      onTagSelect(tag);
    }
  };

  return (
    <div className={clsx("space-y-4", className)}>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          const count = tagCounts?.[tag];

          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={clsx(
                "px-4 py-2 font-bold uppercase tracking-wider text-sm",
                "transition-all duration-200",
                brutal && "border-2 border-brutal-black",
                !brutal && "border border-brutal-gray-300",
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
          className={clsx(
            "flex items-center gap-2",
            "text-sm font-bold text-brutal-gray-600",
            "hover:text-brutal-black transition-colors",
          )}
        >
          <Icon icon={FaTimes} size="sm" />
          Clear filters
        </button>
      )}
    </div>
  );
};

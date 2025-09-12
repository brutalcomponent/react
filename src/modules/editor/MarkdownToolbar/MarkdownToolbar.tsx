/**
 * @file src/modules/editor/MarkdownToolbar/MarkdownToolbar.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Toolbar for markdown editor with common formatting actions
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { IconType } from "react-icons";
import {
  FaBold,
  FaItalic,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaCode,
  FaLink,
  FaImage,
  FaChevronDown,
} from "react-icons/fa";
import { Icon } from "../../../components/core/Icon/";

export interface ToolbarAction {
  icon: IconType;
  label: string;
  markdown: string;
  group?: string;
}

/**
 * @interface MarkdownToolbarProps
 * @description Props for markdown toolbar
 */
export interface MarkdownToolbarProps {
  onAction: (markdown: string) => void;
  brutal?: boolean;
  showMobile?: boolean;
  className?: string;
}

/**
 * @component MarkdownToolbar
 * @description Toolbar with markdown formatting actions
 * @client Uses useState for mobile menu
 */
export const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({
  onAction,
  brutal = true,
  showMobile = true,
  className,
}) => {
  const [showMore, setShowMore] = useState(false);

  const primaryActions: ToolbarAction[] = [
    { icon: FaBold, label: "Bold", markdown: "**text**" },
    { icon: FaItalic, label: "Italic", markdown: "*text*" },
    { icon: FaHeading, label: "Heading", markdown: "## " },
    { icon: FaListUl, label: "List", markdown: "- " },
    { icon: FaLink, label: "Link", markdown: "[text](url)" },
  ];

  const secondaryActions: ToolbarAction[] = [
    { icon: FaListOl, label: "Numbered", markdown: "1. " },
    { icon: FaQuoteLeft, label: "Quote", markdown: "> " },
    { icon: FaCode, label: "Code", markdown: "`code`" },
    { icon: FaImage, label: "Image", markdown: "![alt](url)" },
  ];

  return (
    <div
      className={clsx(
        "border-b-2 border-brutal-black bg-brutal-gray-50",
        className,
      )}
    >
      <div className="flex items-center">
        {/* Primary actions */}
        <div className="flex items-center">
          {primaryActions.map((action, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onAction(action.markdown)}
              className={clsx(
                "p-3 hover:bg-brutal-gray-200 transition-colors",
                "border-r border-brutal-gray-300",
              )}
              title={action.label}
            >
              <Icon icon={action.icon} size="sm" />
            </button>
          ))}
        </div>

        {/* Mobile more button */}
        {showMobile && (
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className={clsx(
              "p-3 hover:bg-brutal-gray-200 transition-colors",
              "flex items-center gap-1 lg:hidden",
            )}
          >
            <span className="text-xs font-bold uppercase">More</span>
            <Icon
              icon={FaChevronDown}
              size="xs"
              className={clsx("transition-transform", showMore && "rotate-180")}
            />
          </button>
        )}

        {/* Secondary actions - desktop */}
        <div className="hidden lg:flex items-center border-l-2 border-brutal-black">
          {secondaryActions.map((action, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onAction(action.markdown)}
              className={clsx(
                "p-3 hover:bg-brutal-gray-200 transition-colors",
                "border-r border-brutal-gray-300",
              )}
              title={action.label}
            >
              <Icon icon={action.icon} size="sm" />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile dropdown */}
      {showMore && showMobile && (
        <div className="flex items-center border-t border-brutal-gray-300 lg:hidden">
          {secondaryActions.map((action, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onAction(action.markdown)}
              className={clsx(
                "p-3 hover:bg-brutal-gray-200 transition-colors",
                "border-r border-brutal-gray-300",
              )}
              title={action.label}
            >
              <Icon icon={action.icon} size="sm" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

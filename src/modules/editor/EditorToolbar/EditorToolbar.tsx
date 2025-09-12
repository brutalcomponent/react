/**
 * @file src/modules/editor/EditorToolbar/EditorToolbar.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Advanced editor toolbar with formatting options and custom actions
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useRef } from "react";
import { clsx } from "clsx";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaCode,
  FaLink,
  FaImage,
  FaTable,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaIndent,
  FaOutdent,
  FaUndo,
  FaRedo,
  FaExpand,
  FaCompress,
  FaPalette,
  FaHighlighter,
  FaTimes,
  FaPlus,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { Icon } from "../../../components/core/Icon";
import { Button } from "../../../components/core/Button";
import { Tooltip } from "../../../components/core/Tooltip";

export interface EditorAction {
  id: string;
  icon: IconType;
  label: string;
  shortcut?: string;
  action: () => void;
  active?: boolean;
  disabled?: boolean;
  group?: string;
}

/**
 * @interface EditorToolbarProps
 * @description Props for the editor toolbar
 */
export interface EditorToolbarProps {
  actions?: EditorAction[];
  onAction?: (actionId: string) => void;
  onFormatText?: (format: string, value?: string) => void;
  fullscreen?: boolean;
  onFullscreenToggle?: () => void;
  brutal?: boolean;
  variant?: "default" | "minimal" | "floating";
  showGroups?: string[];
  className?: string;
  customActions?: React.ReactNode;
}

/**
 * @component EditorToolbar
 * @description Advanced toolbar for rich text editing
 * @client Uses state for dropdowns and formatting
 */
export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  actions,
  onAction,
  onFormatText,
  fullscreen = false,
  onFullscreenToggle,
  brutal = true,
  variant = "default",
  showGroups = ["text", "paragraph", "insert", "tools"],
  className,
  customActions,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const colorPickerRef = useRef<HTMLDivElement>(null);

  /**
   * @const defaultActions
   * @description Default toolbar actions organized by groups
   */
  const defaultActions: EditorAction[] = [
    // Text formatting group
    {
      id: "bold",
      icon: FaBold,
      label: "Bold",
      shortcut: "Ctrl+B",
      action: () => onFormatText?.("bold"),
      group: "text",
    },
    {
      id: "italic",
      icon: FaItalic,
      label: "Italic",
      shortcut: "Ctrl+I",
      action: () => onFormatText?.("italic"),
      group: "text",
    },
    {
      id: "underline",
      icon: FaUnderline,
      label: "Underline",
      shortcut: "Ctrl+U",
      action: () => onFormatText?.("underline"),
      group: "text",
    },
    {
      id: "strike",
      icon: FaStrikethrough,
      label: "Strikethrough",
      action: () => onFormatText?.("strikethrough"),
      group: "text",
    },

    // Paragraph formatting group
    {
      id: "heading",
      icon: FaHeading,
      label: "Heading",
      action: () => onFormatText?.("heading"),
      group: "paragraph",
    },
    {
      id: "unordered-list",
      icon: FaListUl,
      label: "Bullet List",
      action: () => onFormatText?.("unorderedList"),
      group: "paragraph",
    },
    {
      id: "ordered-list",
      icon: FaListOl,
      label: "Numbered List",
      action: () => onFormatText?.("orderedList"),
      group: "paragraph",
    },
    {
      id: "quote",
      icon: FaQuoteLeft,
      label: "Quote",
      action: () => onFormatText?.("quote"),
      group: "paragraph",
    },
    {
      id: "code",
      icon: FaCode,
      label: "Code Block",
      action: () => onFormatText?.("code"),
      group: "paragraph",
    },

    // Alignment group
    {
      id: "align-left",
      icon: FaAlignLeft,
      label: "Align Left",
      action: () => onFormatText?.("alignLeft"),
      group: "align",
    },
    {
      id: "align-center",
      icon: FaAlignCenter,
      label: "Align Center",
      action: () => onFormatText?.("alignCenter"),
      group: "align",
    },
    {
      id: "align-right",
      icon: FaAlignRight,
      label: "Align Right",
      action: () => onFormatText?.("alignRight"),
      group: "align",
    },

    // Insert group
    {
      id: "link",
      icon: FaLink,
      label: "Insert Link",
      shortcut: "Ctrl+K",
      action: () => setShowLinkDialog(true),
      group: "insert",
    },
    {
      id: "image",
      icon: FaImage,
      label: "Insert Image",
      action: () => onFormatText?.("image"),
      group: "insert",
    },
    {
      id: "table",
      icon: FaTable,
      label: "Insert Table",
      action: () => onFormatText?.("table"),
      group: "insert",
    },

    // Tools group
    {
      id: "color",
      icon: FaPalette,
      label: "Text Color",
      action: () => setShowColorPicker(!showColorPicker),
      group: "tools",
    },
    {
      id: "highlight",
      icon: FaHighlighter,
      label: "Highlight",
      action: () => onFormatText?.("highlight"),
      group: "tools",
    },
    {
      id: "indent",
      icon: FaIndent,
      label: "Increase Indent",
      action: () => onFormatText?.("indent"),
      group: "tools",
    },
    {
      id: "outdent",
      icon: FaOutdent,
      label: "Decrease Indent",
      action: () => onFormatText?.("outdent"),
      group: "tools",
    },

    // History group
    {
      id: "undo",
      icon: FaUndo,
      label: "Undo",
      shortcut: "Ctrl+Z",
      action: () => onFormatText?.("undo"),
      group: "history",
    },
    {
      id: "redo",
      icon: FaRedo,
      label: "Redo",
      shortcut: "Ctrl+Y",
      action: () => onFormatText?.("redo"),
      group: "history",
    },
  ];

  const toolbarActions = actions || defaultActions;
  const groupedActions = toolbarActions.reduce(
    (acc, action) => {
      const group = action.group || "default";
      if (!acc[group]) acc[group] = [];
      acc[group].push(action);
      return acc;
    },
    {} as Record<string, EditorAction[]>,
  );

  /**
   * @function handleAction
   * @description Handle toolbar action click
   */
  const handleAction = (action: EditorAction) => {
    if (action.disabled) return;
    action.action();
    if (onAction) onAction(action.id);
  };

  /**
   * @function handleLinkInsert
   * @description Insert a link with URL
   */
  const handleLinkInsert = () => {
    if (linkUrl && onFormatText) {
      onFormatText("link", linkUrl);
      setLinkUrl("");
      setShowLinkDialog(false);
    }
  };

  /**
   * @const colors
   * @description Available text colors
   */
  const colors = [
    "#000000",
    "#FFFFFF",
    "#FFD6E8",
    "#FFE5D6",
    "#FFF3D6",
    "#D6FFE5",
    "#D6EDFF",
    "#E8D6FF",
    "#FFD6D6",
    "#737373",
    "#404040",
    "#171717",
  ];

  const variantClasses = {
    default: clsx(
      "flex flex-wrap items-center gap-1 p-2",
      brutal && "border-b-4 border-brutal-black bg-brutal-gray-50",
      !brutal && "border-b-2 border-brutal-gray-200 bg-brutal-gray-50",
    ),
    minimal: "flex items-center gap-1 p-1",
    floating: clsx(
      "inline-flex items-center gap-1 p-2",
      "bg-brutal-white rounded-lg",
      brutal && "border-2 border-brutal-black shadow-brutal",
      !brutal && "border border-brutal-gray-300 shadow-lg",
    ),
  };

  return (
    <div className={clsx(variantClasses[variant], className)}>
      {/* Grouped actions */}
      {showGroups.map((groupName) => {
        const actions = groupedActions[groupName];
        if (!actions || actions.length === 0) return null;

        return (
          <div key={groupName} className="flex items-center">
            {actions.map((action) => (
              <Tooltip
                key={action.id}
                content={
                  <div>
                    {action.label}
                    {action.shortcut && (
                      <span className="ml-2 text-xs opacity-75">
                        {action.shortcut}
                      </span>
                    )}
                  </div>
                }
              >
                <button
                  type="button"
                  onClick={() => handleAction(action)}
                  disabled={action.disabled}
                  className={clsx(
                    "p-2 transition-all duration-200",
                    "hover:bg-brutal-gray-200",
                    action.active && "bg-brutal-black text-brutal-white",
                    action.disabled && "opacity-50 cursor-not-allowed",
                  )}
                  aria-label={action.label}
                >
                  <Icon icon={action.icon} size="sm" />
                </button>
              </Tooltip>
            ))}

            {/* Group separator */}
            {showGroups.indexOf(groupName) < showGroups.length - 1 && (
              <div className="mx-1 w-px h-6 bg-brutal-gray-300" />
            )}
          </div>
        );
      })}

      {/* Color picker dropdown */}
      {showColorPicker && (
        <div
          ref={colorPickerRef}
          className={clsx(
            "absolute top-full left-0 mt-1 z-50",
            "bg-brutal-white p-2",
            brutal && "border-4 border-brutal-black shadow-brutal",
            !brutal && "border-2 border-brutal-gray-300 shadow-lg",
          )}
        >
          <div className="grid grid-cols-6 gap-1">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => {
                  onFormatText?.("color", color);
                  setShowColorPicker(false);
                }}
                className={clsx(
                  "w-8 h-8 border-2 border-brutal-black",
                  "hover:scale-110 transition-transform",
                )}
                style={{ backgroundColor: color }}
                aria-label={`Color ${color}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Link dialog */}
      {showLinkDialog && (
        <div
          className={clsx(
            "absolute top-full left-0 mt-1 z-50",
            "bg-brutal-white p-4",
            brutal && "border-4 border-brutal-black shadow-brutal",
            !brutal && "border-2 border-brutal-gray-300 shadow-lg",
          )}
        >
          <div className="flex items-center gap-2">
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL..."
              className={clsx(
                "px-3 py-2 text-sm",
                brutal && "border-2 border-brutal-black",
                !brutal && "border border-brutal-gray-300",
                "focus:outline-none",
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLinkInsert();
                if (e.key === "Escape") setShowLinkDialog(false);
              }}
              autoFocus
            />
            <Button size="sm" onClick={handleLinkInsert} brutal={brutal}>
              <FaPlus />
              Insert
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowLinkDialog(false)}
              brutal={brutal}
            >
              <FaTimes />
            </Button>
          </div>
        </div>
      )}

      {/* Custom actions */}
      {customActions && (
        <>
          <div className="mx-1 w-px h-6 bg-brutal-gray-300" />
          {customActions}
        </>
      )}

      {/* Fullscreen toggle */}
      {onFullscreenToggle && (
        <>
          <div className="mx-1 w-px h-6 bg-brutal-gray-300" />
          <Tooltip
            content={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            <button
              type="button"
              onClick={onFullscreenToggle}
              className={clsx(
                "p-2 transition-all duration-200",
                "hover:bg-brutal-gray-200",
                fullscreen && "bg-brutal-black text-brutal-white",
              )}
              aria-label={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              <Icon icon={fullscreen ? FaCompress : FaExpand} size="sm" />
            </button>
          </Tooltip>
        </>
      )}
    </div>
  );
};

/**
 * @component SimpleToolbar
 * @description Simplified toolbar for basic markdown editing
 */
export const SimpleToolbar: React.FC<{
  onInsert: (before: string, after?: string) => void;
  brutal?: boolean;
  className?: string;
}> = ({ onInsert, brutal = true, className }) => {
  const actions = [
    { icon: FaBold, label: "Bold", insert: () => onInsert("**", "**") },
    { icon: FaItalic, label: "Italic", insert: () => onInsert("*", "*") },
    { icon: FaHeading, label: "Heading", insert: () => onInsert("## ", "") },
    { icon: FaListUl, label: "List", insert: () => onInsert("- ", "") },
    { icon: FaQuoteLeft, label: "Quote", insert: () => onInsert("> ", "") },
    { icon: FaCode, label: "Code", insert: () => onInsert("`", "`") },
    { icon: FaLink, label: "Link", insert: () => onInsert("[", "](url)") },
    { icon: FaImage, label: "Image", insert: () => onInsert("![", "](url)") },
  ];

  return (
    <div
      className={clsx(
        "flex items-center gap-1 p-2",
        brutal && "border-b-2 border-brutal-black bg-brutal-gray-50",
        className,
      )}
    >
      {actions.map((action, index) => (
        <Tooltip key={index} content={action.label}>
          <button
            type="button"
            onClick={action.insert}
            className="p-2 hover:bg-brutal-gray-200 transition-colors"
            aria-label={action.label}
          >
            <Icon icon={action.icon} size="sm" />
          </button>
        </Tooltip>
      ))}
    </div>
  );
};

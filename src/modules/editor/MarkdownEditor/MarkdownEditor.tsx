/**
 * @file src/modules/editor/MarkdownEditor/MarkdownEditor.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Lightweight markdown editor component without preview
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useRef, useCallback } from "react";
import { clsx } from "clsx";
import { MarkdownToolbar } from "../MarkdownToolbar/MarkdownToolbar";

export interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  showToolbar?: boolean;
  brutal?: boolean;
  className?: string;
  textareaClassName?: string;
}

/**
 * @component MarkdownEditor
 * @description Simple markdown editor with optional toolbar
 * @client Uses useRef and callbacks
 */
export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your content in Markdown...",
  minHeight = "400px",
  showToolbar = true,
  brutal = true,
  className,
  textareaClassName,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * @function insertMarkdown
   * @description Insert markdown at cursor position
   */
  const insertMarkdown = useCallback(
    (markdown: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent =
        value.substring(0, start) + markdown + value.substring(end);

      onChange(newContent);

      // Reset cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + markdown.length,
          start + markdown.length,
        );
      }, 0);
    },
    [value, onChange],
  );

  return (
    <div
      className={clsx(
        brutal && "border-4 border-brutal-black",
        !brutal && "border-2 border-brutal-gray-300",
        "bg-brutal-white",
        className,
      )}
    >
      {showToolbar && (
        <MarkdownToolbar onAction={insertMarkdown} brutal={brutal} />
      )}

      <div className="relative" style={{ minHeight }}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={clsx(
            "w-full h-full p-4 resize-none",
            "font-mono text-sm bg-transparent",
            "focus:outline-none",
            textareaClassName,
          )}
          style={{ minHeight }}
        />

        {/* Character count */}
        <div className="absolute bottom-2 right-2 text-xs text-brutal-gray-500">
          {value.length} characters
        </div>
      </div>
    </div>
  );
};

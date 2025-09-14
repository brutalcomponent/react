/**
 * @file src/components/core/Input/Textarea.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal textarea component with auto-resize and character counting
 * @client
 */
"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn, getSizeClasses, getAccentClasses } from "../../../utils/cn.utils";
import type { TextareaProps } from "./types";

/**
 * @component Textarea
 * @description Brutal textarea with auto-resize and character counting features
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      brutal = true,
      size = "md",
      variant = "default",
      required = false,
      autoResize = false,
      showCharacterCount = false,
      maxLength,
      accentColor = "brutal-pink",
      className,
      disabled,
      rows = 4,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [characterCount, setCharacterCount] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const sizeClasses = getSizeClasses(size);

    // Auto-resize functionality
    useEffect(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [props.value, autoResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharacterCount(e.target.value.length);
      props.onChange?.(e);

      // Auto-resize on change
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    // Combine refs
    const combinedRef = (node: HTMLTextAreaElement | null) => {
      if (textareaRef.current !== node) {
        (
          textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>
        ).current = node;
      }
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const isNearLimit = maxLength && characterCount > maxLength * 0.8;
    const isOverLimit = maxLength && characterCount > maxLength;

    return (
      <div
        className="w-full"
        style={
          {
            "--accent-color": accentColor.startsWith("#")
              ? accentColor
              : `var(--brutal-${accentColor.replace("brutal-", "")})`,
          } as React.CSSProperties
        }
      >
        {/* Label */}
        {label && (
          <label
            className={cn(
              "block mb-2 font-black uppercase tracking-wider text-brutal-black",
              sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
              required && "after:content-['*'] after:ml-1 after:text-accent",
            )}
          >
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={combinedRef}
          rows={autoResize ? 1 : rows}
          maxLength={maxLength}
          className={cn(
            // Base styling
            "w-full font-mono transition-all duration-200 resize-none",
            "bg-brutal-white text-brutal-black placeholder:text-brutal-gray-500",

            // Size classes
            sizeClasses.padding,
            sizeClasses.text,

            // Brutal styling
            brutal && [
              sizeClasses.border,
              "border-brutal-black",
              "focus:shadow-brutal focus:-translate-x-0.5 focus:-translate-y-0.5",
              "hover:shadow-brutal-sm hover:-translate-x-0.25 hover:-translate-y-0.25",
            ],
            !brutal && [
              "border-2 border-brutal-gray-300 rounded-md",
              "focus:border-accent focus:ring-2 focus:ring-accent/20",
            ],

            // Variant styling
            variant === "ghost" && [
              "bg-transparent border-transparent",
              "focus:bg-brutal-white focus:border-brutal-black",
            ],
            variant === "filled" && "bg-brutal-gray-100",

            // States
            error && "border-accent",
            isOverLimit && "border-brutal-coral",
            disabled && [
              "opacity-50 cursor-not-allowed bg-brutal-gray-100",
              "hover:transform-none hover:shadow-none",
            ],
            isFocused &&
              brutal &&
              "shadow-brutal -translate-x-0.5 -translate-y-0.5",

            // Resize behavior
            !autoResize && "resize-y",

            // Focus styles
            "focus:outline-none",

            className,
          )}
          disabled={disabled}
          required={required}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          onChange={handleChange}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${props.id || "textarea"}-error`
              : hint
                ? `${props.id || "textarea"}-hint`
                : undefined
          }
          {...props}
        />

        {/* Character count and hint */}
        <div className="flex justify-between items-start mt-2">
          <div className="flex-1">
            {/* Hint text */}
            {hint && !error && (
              <p
                id={`${props.id || "textarea"}-hint`}
                className={cn(
                  "text-brutal-gray-600 font-mono",
                  sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
                )}
              >
                {hint}
              </p>
            )}

            {/* Error message */}
            {error && (
              <p
                id={`${props.id || "textarea"}-error`}
                className={cn(
                  "font-black uppercase tracking-wider text-accent",
                  sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
                )}
                role="alert"
              >
                {error}
              </p>
            )}
          </div>

          {/* Character count */}
          {showCharacterCount && maxLength && (
            <p
              className={cn(
                "font-mono ml-4 flex-shrink-0",
                sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
                isOverLimit
                  ? "text-brutal-coral font-bold"
                  : isNearLimit
                    ? "text-brutal-yellow font-bold"
                    : "text-brutal-gray-500",
              )}
            >
              {characterCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

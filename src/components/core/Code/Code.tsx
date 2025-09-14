/**
 * @file src/components/core/Code/Code.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal code display component with copy functionality and syntax highlighting support
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useCallback } from "react";
import { FaCopy, FaCheck, FaCode, FaTerminal } from "react-icons/fa";
import { Icon } from "../Icon";
import { cn, getSizeClasses, brutalBase } from "../../../utils/cn.utils";

export interface CodeProps {
  children: string;
  language?: string;
  inline?: boolean;
  showLineNumbers?: boolean;
  copyable?: boolean;
  brutal?: boolean;
  variant?: "default" | "terminal" | "minimal";
  size?: "xs" | "sm" | "md" | "lg";
  accentColor?: string;
  className?: string;
}

/**
 * @component Code
 * @description Brutal code display with copy functionality and multiple variants
 */
export const Code: React.FC<CodeProps> = ({
  children,
  language,
  inline = false,
  showLineNumbers = false,
  copyable = true,
  brutal = true,
  variant = "default",
  size = "sm",
  accentColor = "brutal-pink",
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const sizeClasses = getSizeClasses(size);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  }, [children]);

  // Inline code variant
  if (inline) {
    return (
      <code
        className={cn(
          // Base inline styling
          "inline-block font-mono font-bold",
          sizeClasses.padding,
          sizeClasses.text,

          // Background and text
          "bg-brutal-gray-200 text-brutal-black",

          // Brutal styling
          brutal && [
            "border-2 border-brutal-black",
            "shadow-brutal-sm",
            "transform -skew-x-1",
          ],
          !brutal && "rounded border",

          // Interactive
          "hover:bg-brutal-gray-300 transition-colors duration-200",

          className,
        )}
        style={
          {
            "--accent-color": accentColor.startsWith("#")
              ? accentColor
              : `var(--brutal-${accentColor.replace("brutal-", "")})`,
          } as React.CSSProperties
        }
      >
        {children}
      </code>
    );
  }

  const lines = children.split("\n");
  const isTerminal = variant === "terminal";
  const isMinimal = variant === "minimal";

  return (
    <div
      className={cn(
        // Base container
        "relative group overflow-hidden",

        // Brutal styling
        brutal && [
          "shadow-brutal",
          "border-4 border-brutal-black",
          "transform -rotate-1 hover:rotate-0",
          brutalBase.transition,
        ],
        !brutal && "rounded-lg border shadow-lg",

        className,
      )}
      style={
        {
          "--accent-color": accentColor.startsWith("#")
            ? accentColor
            : `var(--brutal-${accentColor.replace("brutal-", "")})`,
        } as React.CSSProperties
      }
    >
      {/* Header - only show for non-minimal variant */}
      {!isMinimal && (
        <div
          className={cn(
            // Header layout
            "flex items-center justify-between px-4 py-3",

            // Header styling
            isTerminal
              ? "bg-brutal-black text-brutal-white"
              : "bg-accent text-brutal-black",

            // Brutal header
            brutal && "border-b-4 border-brutal-black",
            !brutal && "border-b",

            // Typography
            "font-black uppercase tracking-wider",
          )}
        >
          <div className="flex items-center gap-2">
            <Icon
              icon={isTerminal ? FaTerminal : FaCode}
              size="sm"
              className={isTerminal ? "text-brutal-white" : "text-brutal-black"}
            />
            <span className="text-xs">
              {language || (isTerminal ? "terminal" : "code")}
            </span>
          </div>

          {copyable && (
            <button
              onClick={handleCopy}
              className={cn(
                // Button styling
                "flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider",
                "transition-all duration-200",

                // Button variants
                isTerminal
                  ? "bg-brutal-white text-brutal-black hover:bg-brutal-gray-100"
                  : "bg-brutal-black text-brutal-white hover:bg-brutal-gray-800",

                // Brutal button
                brutal && [
                  "border-2 border-brutal-black shadow-brutal-sm",
                  "hover:shadow-brutal transform hover:-translate-y-0.5",
                ],
                !brutal && "rounded hover:scale-105",

                // Show on hover
                "opacity-0 group-hover:opacity-100 transition-opacity",
              )}
              aria-label={copied ? "Code copied!" : "Copy code to clipboard"}
            >
              <Icon icon={copied ? FaCheck : FaCopy} size="xs" />
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
      )}

      {/* Code content */}
      <div
        className={cn(
          // Container
          "overflow-x-auto",

          // Background
          isTerminal
            ? "bg-brutal-black text-brutal-white"
            : "bg-brutal-gray-900 text-brutal-gray-100",

          // Minimal variant adjustments
          isMinimal && "bg-brutal-gray-50 text-brutal-black",

          // Brutal styling
          brutal && !isMinimal && "border-t-2 border-brutal-black",
        )}
      >
        <pre
          className={cn(
            // Pre styling
            "font-mono leading-relaxed",
            sizeClasses.padding,
            sizeClasses.text,

            // Scrollbar styling
            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-brutal-gray-600",
          )}
        >
          {showLineNumbers ? (
            <table className="w-full border-collapse">
              <tbody>
                {lines.map((line, idx) => (
                  <tr key={idx} className="hover:bg-brutal-gray-800/30">
                    <td
                      className={cn(
                        // Line number styling
                        "pr-4 text-right select-none font-bold",
                        "border-r border-brutal-gray-700",

                        // Colors
                        isTerminal
                          ? "text-brutal-gray-500"
                          : isMinimal
                            ? "text-brutal-gray-400"
                            : "text-brutal-gray-500",
                      )}
                    >
                      {String(idx + 1).padStart(
                        String(lines.length).length,
                        " ",
                      )}
                    </td>
                    <td className="pl-4">
                      <code className="whitespace-pre">{line || " "}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <code className="whitespace-pre">{children}</code>
          )}
        </pre>
      </div>

      {/* Copy notification */}
      {copied && (
        <div
          className={cn(
            // Notification positioning
            "absolute bottom-3 right-3",
            "px-3 py-1 text-xs font-black uppercase tracking-wider",

            // Notification styling
            "bg-accent text-brutal-black",

            // Brutal notification
            brutal && "border-2 border-brutal-black shadow-brutal",
            !brutal && "rounded shadow-lg",

            // Animation
            "animate-fade-in",
          )}
        >
          Copied to clipboard!
        </div>
      )}
    </div>
  );
};

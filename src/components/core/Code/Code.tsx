/**
 * @file src/components/core/Code/Code.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal code display component
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { FaCopy, FaCheck } from "react-icons/fa";
import { Icon } from "../Icon/Icon";
import type { CodeProps } from "./types";

export const Code: React.FC<CodeProps> = ({
  children,
  language,
  inline = false,
  showLineNumbers = false,
  copyable = true,
  brutal = true,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (inline) {
    return (
      <code
        className={clsx(
          "inline-block px-2 py-1",
          "bg-brutal-gray-200 text-brutal-black",
          "font-mono text-sm",
          brutal && "border border-brutal-black",
          className,
        )}
      >
        {children}
      </code>
    );
  }

  const lines = children.split("\n");

  return (
    <div
      className={clsx("relative group", brutal && "shadow-brutal", className)}
    >
      {/* Header */}
      <div
        className={clsx(
          "flex items-center justify-between",
          "px-4 py-2 bg-brutal-black text-brutal-white",
          brutal && "border-4 border-brutal-black border-b-0",
        )}
      >
        <span className="text-xs font-bold uppercase tracking-wider">
          {language || "code"}
        </span>

        {copyable && (
          <button
            onClick={handleCopy}
            className={clsx(
              "flex items-center gap-1.5",
              "px-2 py-1 text-xs font-bold uppercase tracking-wider",
              "bg-brutal-white text-brutal-black",
              "hover:bg-brutal-gray-100 transition-colors",
              "opacity-0 group-hover:opacity-100 transition-opacity",
            )}
            aria-label="Copy code"
          >
            <Icon icon={copied ? FaCheck : FaCopy} size="xs" />
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>

      {/* Code content */}
      <div
        className={clsx(
          "overflow-x-auto",
          "bg-brutal-gray-900 text-brutal-gray-100",
          brutal && "border-4 border-brutal-black border-t-2",
        )}
      >
        <pre className="p-4 font-mono text-sm leading-relaxed">
          {showLineNumbers ? (
            <table className="w-full">
              <tbody>
                {lines.map((line, idx) => (
                  <tr key={idx}>
                    <td className="pr-4 text-brutal-gray-500 text-right select-none">
                      {idx + 1}
                    </td>
                    <td>
                      <code>{line || "\n"}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <code>{children}</code>
          )}
        </pre>
      </div>
    </div>
  );
};

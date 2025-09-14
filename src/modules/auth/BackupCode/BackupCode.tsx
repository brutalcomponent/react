/**
 * @file src/modules/auth/BackupCode/BackupCode.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Backup codes display with copy and download functionality
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useCallback } from "react";
import { FaCopy, FaDownload, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { Icon } from "../../../components/core/Icon";
import { useClipboard } from "../../../hooks/useClipboard";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface BackupCodeProps {
  codes: string[];
  title?: string;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  accentColor?: string;
  className?: string;
}

export const BackupCode: React.FC<BackupCodeProps> = ({
  codes,
  title = "Backup Codes",
  brutal = true,
  size = "md",
  accentColor = "brutal-pink",
  className,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { copy, copied: allCopied } = useClipboard({ timeout: 2000 });
  const sizeClasses = getSizeClasses(size);

  const copyCode = useCallback(
    async (code: string, index: number) => {
      const success = await copy(code);
      if (success) {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      }
    },
    [copy],
  );

  const copyAllCodes = useCallback(() => {
    copy(codes.join("\n"));
  }, [codes, copy]);

  const downloadCodes = useCallback(() => {
    const content = [
      `Backup Codes - Generated ${new Date().toISOString()}`,
      "",
      ...codes,
      "",
      "Keep these codes safe! Each can only be used once.",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `backup-codes-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }, [codes]);

  return (
    <div
      className={cn(
        "p-0", // base reset
        brutal &&
          "p-6 bg-brutal-white border-4 border-brutal-black shadow-brutal",
        !brutal && "p-4 bg-brutal-white border rounded-lg shadow",
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
      {/* Header */}
      <div className="mb-4">
        <h3
          className={cn(
            "font-black uppercase tracking-wider mb-2",
            size === "xs"
              ? "text-base"
              : size === "sm"
                ? "text-lg"
                : size === "md"
                  ? "text-xl"
                  : "text-2xl",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-brutal-gray-600",
            sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
          )}
        >
          Save these codes in a secure place. Each code can only be used once.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setIsRevealed(!isRevealed)}
          className={cn(
            "inline-flex items-center gap-2",
            "px-3 py-2 font-black uppercase tracking-wider",
            sizeClasses.text === "text-xs" ? "text-xs" : "text-xs",
            brutal
              ? "border-2 border-brutal-black bg-brutal-white hover:bg-brutal-gray-100 shadow-brutal-sm hover:shadow-brutal transition-all duration-200"
              : "border rounded bg-white hover:bg-brutal-gray-100 transition-colors",
          )}
          aria-pressed={isRevealed}
        >
          <Icon icon={isRevealed ? FaEyeSlash : FaEye} size="sm" />
          {isRevealed ? "Hide" : "Show"}
        </button>

        <button
          onClick={copyAllCodes}
          className={cn(
            "inline-flex items-center gap-2",
            "px-3 py-2 font-black uppercase tracking-wider",
            sizeClasses.text === "text-xs" ? "text-xs" : "text-xs",
            brutal
              ? "border-2 border-brutal-black bg-brutal-white hover:bg-brutal-gray-100 shadow-brutal-sm hover:shadow-brutal transition-all duration-200"
              : "border rounded bg-white hover:bg-brutal-gray-100 transition-colors",
          )}
          aria-live="polite"
        >
          <Icon icon={allCopied ? FaCheck : FaCopy} size="sm" />
          {allCopied ? "Copied!" : "Copy All"}
        </button>

        <button
          onClick={downloadCodes}
          className={cn(
            "inline-flex items-center gap-2",
            "px-3 py-2 font-black uppercase tracking-wider",
            sizeClasses.text === "text-xs" ? "text-xs" : "text-xs",
            brutal
              ? "border-2 border-brutal-black bg-brutal-white hover:bg-brutal-gray-100 shadow-brutal-sm hover:shadow-brutal transition-all duration-200"
              : "border rounded bg-white hover:bg-brutal-gray-100 transition-colors",
          )}
        >
          <Icon icon={FaDownload} size="sm" />
          Download
        </button>
      </div>

      {/* Codes grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {codes.map((code, index) => {
          const disabled = !isRevealed;
          const isCopied = copiedIndex === index;

          return (
            <button
              key={index}
              onClick={() => !disabled && copyCode(code, index)}
              disabled={disabled}
              className={cn(
                "p-3 font-mono transition-all duration-200 text-center select-none",
                sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
                brutal ? "border-2 border-brutal-black" : "border rounded",
                disabled
                  ? "bg-brutal-black text-brutal-black cursor-not-allowed"
                  : "bg-brutal-gray-100 hover:bg-brutal-gray-200 cursor-pointer",
                isCopied && "bg-brutal-mint",
              )}
              aria-disabled={disabled}
              aria-label={
                isRevealed ? `Copy code ${code}` : "Hidden backup code"
              }
            >
              {isRevealed ? code : "••••-••••"}
            </button>
          );
        })}
      </div>

      {isRevealed && (
        <p
          className={cn(
            "mt-4 text-center font-mono text-brutal-gray-600",
            sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
          )}
        >
          Click any code to copy it
        </p>
      )}
    </div>
  );
};

/**
 * @file src/modules/auth/BackupCode/BackupCode.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Backup codes display with copy and download functionality
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { FaCopy, FaDownload, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { Icon } from "../../../components/core/Icon";
import { useClipboard } from "../../../hooks/useClipboard";

export interface BackupCodeProps {
  codes: string[];
  title?: string;
  brutal?: boolean;
  className?: string;
}

export const BackupCode: React.FC<BackupCodeProps> = ({
  codes,
  title = "Backup Codes",
  brutal = true,
  className,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { copy, copied: allCopied } = useClipboard({
    timeout: 2000,
  });

  const copyCode = async (code: string, index: number) => {
    const success = await copy(code);
    if (success) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const copyAllCodes = () => {
    copy(codes.join("\n"));
  };

  const downloadCodes = () => {
    const content = `Backup Codes - Generated ${new Date().toISOString()}\n\n${codes.join("\n")}\n\nKeep these codes safe! Each can only be used once.`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `backup-codes-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={clsx(
        brutal &&
          "p-6 bg-brutal-white border-4 border-brutal-black shadow-brutal",
        className,
      )}
    >
      <div className="mb-4">
        <h3 className="text-lg font-black uppercase tracking-wider mb-2">
          {title}
        </h3>
        <p className="text-sm text-brutal-gray-600">
          Save these codes in a secure place. Each code can only be used once.
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setIsRevealed(!isRevealed)}
          className={clsx(
            "flex items-center gap-2 px-3 py-2",
            "font-bold uppercase tracking-wider text-xs",
            "border-2 border-brutal-black",
            "hover:bg-brutal-gray-100 transition-colors",
          )}
        >
          <Icon icon={isRevealed ? FaEyeSlash : FaEye} size="sm" />
          {isRevealed ? "Hide" : "Show"}
        </button>

        <button
          onClick={copyAllCodes}
          className={clsx(
            "flex items-center gap-2 px-3 py-2",
            "font-bold uppercase tracking-wider text-xs",
            "border-2 border-brutal-black",
            "hover:bg-brutal-gray-100 transition-colors",
          )}
        >
          <Icon icon={allCopied ? FaCheck : FaCopy} size="sm" />
          {allCopied ? "Copied!" : "Copy All"}
        </button>

        <button
          onClick={downloadCodes}
          className={clsx(
            "flex items-center gap-2 px-3 py-2",
            "font-bold uppercase tracking-wider text-xs",
            "border-2 border-brutal-black",
            "hover:bg-brutal-gray-100 transition-colors",
          )}
        >
          <Icon icon={FaDownload} size="sm" />
          Download
        </button>
      </div>

      {/* Codes grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {codes.map((code, index) => (
          <button
            key={index}
            onClick={() => isRevealed && copyCode(code, index)}
            disabled={!isRevealed}
            className={clsx(
              "p-3 font-mono text-sm",
              "border-2 border-brutal-black",
              "transition-all duration-200",
              isRevealed
                ? [
                    "bg-brutal-gray-100 hover:bg-brutal-gray-200",
                    "cursor-pointer",
                  ]
                : ["bg-brutal-black text-brutal-black", "cursor-not-allowed"],
              copiedIndex === index && "bg-brutal-mint",
            )}
          >
            {isRevealed ? code : "••••-••••"}
          </button>
        ))}
      </div>

      {isRevealed && (
        <p className="mt-4 text-xs text-brutal-gray-600 text-center font-mono">
          Click any code to copy it
        </p>
      )}
    </div>
  );
};

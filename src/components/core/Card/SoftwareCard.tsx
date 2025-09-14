/**
 * @file src/components/core/Card/SoftwareCard.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Software showcase card with copy functionality
 * Matches original dvh.sh styling exactly
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useCallback } from "react";
import { FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import { Icon } from "../Icon";
import { cn } from "../../../utils/cn.utils";

export interface SoftwareCardProps {
  title: string;
  description: string;
  link?: string;
  price?: string;
  brewInstall?: string;
  operatingSystem?: string;
  features?: string[];
  variant?: "default" | "compact" | "detailed";
  brutal?: boolean;
  accentColor?: string;
  className?: string;
}

export const SoftwareCard: React.FC<SoftwareCardProps> = ({
  title,
  description,
  link,
  price,
  brewInstall,
  operatingSystem,
  features = [],
  variant = "default",
  brutal = true,
  accentColor = "brutal-pink",
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback((text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (e) {
      console.error("Clipboard write failed:", e);
    }
  }, []);

  const safeLink =
    typeof link === "string" && link
      ? link.startsWith("http")
        ? link
        : `https://${link}`
      : undefined;

  const osTags = operatingSystem
    ? operatingSystem
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <div
      className={cn(
        // Base styling - match original exactly
        "relative bg-brutal-surface0 border-4 border-accent p-6 shadow-brutal",
        "overflow-hidden flex flex-col h-full",
        "transform -rotate-1 hover:rotate-0 hover:scale-1.02 hover:translate-x-1.5",
        "transition-all duration-300",

        className,
      )}
    >
      {/* Title + Price */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-xl font-black text-accent uppercase tracking-wider transform -skew-x-6">
          {title}
        </h3>
        {price && (
          <span className="inline-block bg-brutal-surface1 text-brutal-gray-600 px-3 py-1 text-xs font-black uppercase tracking-wider border-2 border-accent">
            {price}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-brutal-gray-700 mb-4 flex-grow font-mono text-sm leading-relaxed">
        {description}
      </p>

      {/* Features */}
      {features.length > 0 && variant === "detailed" && (
        <ul className="mb-4 space-y-1">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start text-xs text-brutal-gray-600"
            >
              <span className="mr-2 text-accent">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* OS + Actions */}
      <div className="mt-auto flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1 text-xs font-black uppercase tracking-wider text-brutal-gray-600">
          {osTags.length ? (
            osTags.map((os, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 border border-accent bg-brutal-surface1"
              >
                {os}
              </span>
            ))
          ) : (
            <span className="px-2 py-0.5 border border-accent bg-brutal-surface1">
              N/A
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {brewInstall && (
            <button
              onClick={() => copyToClipboard(brewInstall)}
              className="inline-flex items-center gap-2 text-brutal-gray-600 hover:text-accent transition-colors px-2 py-1 border-2 border-accent bg-brutal-surface1 font-black uppercase tracking-wider text-xs"
              aria-label="Copy Brew Install Command"
              title="Copy Brew Install Command"
            >
              <Icon icon={FaCopy} size="xs" />
              Copy
            </button>
          )}

          {safeLink && (
            <a
              href={safeLink}
              className="inline-flex items-center gap-2 text-accent border-2 border-accent px-2 py-1 bg-transparent hover:bg-accent hover:text-brutal-black transition-colors font-black uppercase tracking-wider text-xs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View software"
            >
              <Icon icon={FaExternalLinkAlt} size="xs" />
              View
            </a>
          )}
        </div>
      </div>

      {/* Copy toast */}
      {copied && (
        <div className="absolute bottom-3 right-3 bg-brutal-surface1 border-2 border-accent text-brutal-gray-700 px-3 py-1 font-mono text-xs shadow-brutal">
          Copied!
        </div>
      )}

      {/* Subtle inner wobble */}
      <div className="pointer-events-none absolute inset-1 border-2 border-accent opacity-30" />
    </div>
  );
};

/**
 * @component SoftwareCardSkeleton
 * @description Skeleton loader for SoftwareCard
 */
export const SoftwareCardSkeleton: React.FC = () => (
  <div className="bg-brutal-surface0 border-4 border-accent p-6 shadow-brutal h-[200px] flex flex-col animate-pulse">
    <div className="h-6 bg-brutal-gray-300 w-3/4 mb-3" />
    <div className="h-4 bg-brutal-gray-300 w-full mb-2" />
    <div className="h-4 bg-brutal-gray-300 w-5/6 mb-4" />
    <div className="mt-auto flex items-center gap-2">
      <div className="h-7 w-20 bg-brutal-gray-300" />
      <div className="h-7 w-16 bg-brutal-gray-300" />
    </div>
  </div>
);

/**
 * @file src/components/core/Card/SoftwareCard.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Software showcase card with copy functionality
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { FaCopy, FaExternalLinkAlt, FaCheck } from "react-icons/fa";
import { Icon } from "../Icon";
import { useClipboard } from "../../../hooks/useClipboard";

export interface SoftwareCardProps {
  title: string;
  description: string;
  link?: string;
  price?: string;
  installCommand?: string;
  operatingSystems?: string[];
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
  installCommand,
  operatingSystems = [],
  features = [],
  variant = "default",
  brutal = true,
  accentColor = "brutal-pink",
  className,
}) => {
  const { copy, copied } = useClipboard({ timeout: 2000 });

  return (
    <div
      className={clsx(
        "relative overflow-hidden flex flex-col h-full",
        brutal
          ? "bg-brutal-white border-4 border-brutal-black p-6 shadow-brutal"
          : "bg-brutal-white border border-brutal-gray-300 p-6 shadow-md",
        brutal &&
          "hover:shadow-brutal-md hover:-translate-x-0.5 hover:-translate-y-0.5",
        "hover:-rotate-1 transition-all duration-300",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3
          className={clsx(
            "text-xl font-black uppercase tracking-wider",
            `text-${accentColor}`,
            brutal && "transform -skew-x-6",
          )}
        >
          {title}
        </h3>
        {price && (
          <span
            className={clsx(
              "inline-block px-3 py-1 text-xs font-black uppercase tracking-wider",
              "bg-brutal-gray-100 text-brutal-gray-700",
              brutal && "border-2 border-brutal-black",
            )}
          >
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
              <span className={clsx("mr-2", `text-${accentColor}`)}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* OS Tags */}
      {operatingSystems.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {operatingSystems.map((os, idx) => (
            <span
              key={idx}
              className={clsx(
                "px-2 py-0.5 text-xs font-black uppercase",
                brutal
                  ? "border border-brutal-black"
                  : "border border-brutal-gray-300",
                "bg-brutal-gray-100",
              )}
            >
              {os}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 mt-auto">
        {installCommand && (
          <button
            onClick={() => copy(installCommand)}
            className={clsx(
              "inline-flex items-center gap-2 px-3 py-1",
              "text-brutal-gray-700 hover:text-brutal-black",
              brutal && "border-2 border-brutal-black bg-brutal-gray-100",
              !brutal && "border border-brutal-gray-300 bg-brutal-gray-100",
              "hover:bg-brutal-black hover:text-brutal-white",
              "transition-all duration-200 font-black uppercase tracking-wider text-xs",
            )}
            disabled={copied}
          >
            <Icon icon={copied ? FaCheck : FaCopy} size="xs" />
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        )}

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "inline-flex items-center gap-2 px-3 py-1",
              "text-brutal-black",
              brutal && "border-2 border-brutal-black",
              !brutal && "border border-brutal-gray-300",
              "bg-transparent hover:bg-brutal-black hover:text-brutal-white",
              "transition-all duration-200 font-black uppercase tracking-wider text-xs",
            )}
          >
            <Icon icon={FaExternalLinkAlt} size="xs" />
            <span>View</span>
          </a>
        )}
      </div>

      {/* Inner decoration */}
      {brutal && (
        <div className="pointer-events-none absolute inset-1 border-2 border-brutal-black opacity-20" />
      )}
    </div>
  );
};

/**
 * @component SoftwareCardSkeleton
 * @description Skeleton loader for SoftwareCard
 */
export const SoftwareCardSkeleton: React.FC = () => (
  <div className="bg-brutal-white border-4 border-brutal-black p-6 shadow-brutal h-[200px] flex flex-col animate-pulse">
    <div className="flex justify-between mb-3">
      <div className="h-6 bg-brutal-gray-200 w-3/4 rounded" />
      <div className="h-6 bg-brutal-gray-200 w-16 rounded" />
    </div>
    <div className="flex-grow space-y-2 mb-4">
      <div className="h-4 bg-brutal-gray-200 rounded" />
      <div className="h-4 bg-brutal-gray-200 w-5/6 rounded" />
    </div>
    <div className="flex gap-2">
      <div className="h-8 w-20 bg-brutal-gray-200 rounded" />
      <div className="h-8 w-16 bg-brutal-gray-200 rounded" />
    </div>
  </div>
);

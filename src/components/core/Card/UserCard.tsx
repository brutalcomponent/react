/**
 * @file src/components/core/Card/UserCard.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * User profile card with rotating titles
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useEffect } from "react";
import { clsx } from "clsx";

export interface UserCardProps {
  name: string;
  avatar: string;
  titles?: string[];
  bio?: string;
  links?: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
  }>;
  rotationInterval?: number;
  variant?: "default" | "compact" | "detailed";
  brutal?: boolean;
  accentColor?: string;
  className?: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  name,
  avatar,
  titles = [],
  bio,
  links = [],
  rotationInterval = 2500,
  variant = "default",
  brutal = true,
  accentColor = "brutal-pink",
  className,
}) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (titles.length <= 1) return;

    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [titles.length, rotationInterval]);

  return (
    <div
      className={clsx(
        "text-center",
        variant === "detailed" && [
          brutal
            ? "bg-brutal-white border-4 border-brutal-black p-6 shadow-brutal"
            : "bg-brutal-white border border-brutal-gray-300 p-6 shadow-md",
        ],
        className,
      )}
    >
      <div className="relative mx-auto mb-4 w-32 h-32 group">
        {/* Animated background accent */}
        <div
          className={clsx(
            "absolute inset-0 rounded-full animate-pulse opacity-30",
            `bg-${accentColor}`,
          )}
        />

        {/* Avatar */}
        <div
          className={clsx(
            "relative rounded-full overflow-hidden",
            brutal
              ? "border-4 border-brutal-black shadow-brutal"
              : "border-2 border-brutal-gray-300",
            "group-hover:shadow-brutal-md transition-all duration-300",
          )}
        >
          {!isImageLoaded && (
            <div className="w-full h-full bg-brutal-gray-200 animate-pulse" />
          )}
          <img
            src={avatar}
            alt={name}
            width={128}
            height={128}
            onLoad={() => setIsImageLoaded(true)}
            className={clsx(
              "w-full h-full object-cover",
              "group-hover:scale-110 transition-transform duration-300",
              !isImageLoaded && "invisible",
            )}
          />
        </div>
      </div>

      {/* Name */}
      <h3
        className={clsx(
          "text-xl font-black mb-2 uppercase tracking-widest",
          brutal &&
            "transform hover:-skew-x-6 transition-transform duration-200",
        )}
      >
        {name}
      </h3>

      {/* Rotating titles */}
      {titles.length > 0 && (
        <div className="h-6 relative overflow-hidden">
          <div
            className="absolute inset-x-0 transition-transform duration-300"
            style={{
              transform: `translateY(-${titleIndex * 100}%)`,
            }}
          >
            {titles.map((title, index) => (
              <p
                key={index}
                className="text-sm text-brutal-gray-600 font-mono h-6 flex items-center justify-center"
              >
                {title}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Bio */}
      {bio && variant !== "compact" && (
        <p className="mt-4 text-sm text-brutal-gray-700 font-mono max-w-xs mx-auto">
          {bio}
        </p>
      )}

      {/* Links */}
      {links.length > 0 && variant === "detailed" && (
        <div className="mt-4 flex justify-center gap-3">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "inline-flex items-center gap-1 px-3 py-1",
                "text-xs font-bold uppercase tracking-wider",
                brutal && "border-2 border-brutal-black",
                !brutal && "border border-brutal-gray-300",
                "hover:bg-brutal-black hover:text-brutal-white transition-colors",
              )}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

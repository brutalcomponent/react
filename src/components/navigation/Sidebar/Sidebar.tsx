/**
 * @file src/components/navigation/Sidebar/Sidebar.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Sidebar navigation component with mobile support
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { Icon, FaBars, FaTimes } from "../../core/Icon";

export interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  defaultOpen?: boolean;
  overlay?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  className,
  logo,
  footer,
  defaultOpen = true,
  overlay = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(mobile ? false : defaultOpen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [defaultOpen]);

  // Prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Mobile toggle */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            "fixed top-4 left-4 z-50 p-2",
            "bg-brutal-white border-4 border-brutal-black shadow-brutal",
            "hover:shadow-brutal-md hover:-translate-x-0.5 hover:-translate-y-0.5",
            "transition-all duration-200",
            "md:hidden",
          )}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Icon
            icon={isOpen ? FaTimes : FaBars}
            size="md"
            className="text-brutal-black"
          />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-screen w-64",
          "bg-gradient-to-br from-brutal-white to-brutal-gray-50",
          "border-r-4 border-brutal-black",
          "transform transition-transform duration-300 z-40",
          "flex flex-col",
          "shadow-brutal-lg",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        {/* Logo area */}
        {logo && (
          <div className="p-4 border-b-4 border-brutal-black bg-brutal-black text-brutal-white">
            {logo}
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-brutal-black scrollbar-track-brutal-gray-100">
          {children}
        </div>

        {/* Footer area */}
        {footer && (
          <div className="p-4 border-t-4 border-brutal-black bg-brutal-gray-100">
            {footer}
          </div>
        )}

        {/* Noise texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.65%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
        </div>
      </aside>

      {/* Mobile backdrop */}
      {isMobile && isOpen && overlay && (
        <div
          className="fixed inset-0 bg-brutal-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

/**
 * @component SidebarSkeleton
 * @description Skeleton loader for Sidebar
 * @client Uses React hooks (useState, useEffect, etc.)
 */
export const SidebarSkeleton: React.FC = () => (
  <div className="w-64 h-screen bg-brutal-white border-r-4 border-brutal-black animate-pulse">
    <div className="p-4 border-b-4 border-brutal-black bg-brutal-black">
      <div className="h-8 bg-brutal-gray-700 rounded" />
    </div>
    <div className="p-4 space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-10 bg-brutal-gray-200 rounded" />
      ))}
    </div>
  </div>
);

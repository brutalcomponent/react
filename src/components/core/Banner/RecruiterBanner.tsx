/**
 * @file src/components/core/Banner/RecruiterBanner.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Dismissible banner for recruiters
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { FaFileAlt, FaTimes } from "react-icons/fa";
import { Icon } from "../../core/Icon";

export interface RecruiterBannerProps {
  resumeLink?: string;
  delay?: number;
  cookieDays?: number;
  className?: string;
}

export const RecruiterBanner: React.FC<RecruiterBannerProps> = ({
  resumeLink = "/resume",
  delay = 2000,
  cookieDays = 7,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const dismissed = localStorage.getItem("recruiterBannerDismissed");
    const dismissTime = localStorage.getItem("recruiterBannerDismissTime");

    const shouldShow =
      !dismissed ||
      (dismissTime &&
        Date.now() - parseInt(dismissTime) > cookieDays * 24 * 60 * 60 * 1000);

    if (shouldShow) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay, cookieDays]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("recruiterBannerDismissed", "true");
    localStorage.setItem("recruiterBannerDismissTime", Date.now().toString());
  };

  if (!mounted || !isVisible) return null;

  return (
    <div
      className={clsx(
        "fixed bottom-4 right-4 z-50 max-w-sm",
        "animate-slide-in-right",
        className,
      )}
    >
      <div
        className={clsx(
          "bg-brutal-white border-4 border-brutal-pink p-4 shadow-brutal relative",
          "transform hover:rotate-0 hover:scale-102 transition-all duration-200",
          "rotate-1",
        )}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className={clsx(
            "absolute -top-2 -right-2 bg-brutal-pink text-brutal-white p-1",
            "shadow-brutal hover:scale-110 transition-transform",
          )}
          aria-label="Dismiss"
        >
          <Icon icon={FaTimes} size="xs" />
        </button>

        <div className="flex items-start gap-3">
          <Icon
            icon={FaFileAlt}
            size="lg"
            className="text-brutal-pink flex-shrink-0 mt-1"
          />
          <div>
            <h3 className="font-black text-brutal-pink uppercase tracking-wider text-sm mb-1">
              Looking for a developer?
            </h3>
            <p className="text-xs text-brutal-gray-700 mb-3 font-mono">
              View my formatted resume with experience, skills, and contact
              info.
            </p>
            <a
              href={resumeLink}
              className={clsx(
                "inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider",
                "bg-brutal-pink text-brutal-white px-3 py-2",
                "hover:bg-brutal-peach transition-colors",
                "shadow-brutal border-2 border-brutal-black",
              )}
              onClick={handleDismiss}
            >
              <Icon icon={FaFileAlt} size="xs" />
              View Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

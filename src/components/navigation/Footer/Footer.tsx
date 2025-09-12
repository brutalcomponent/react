/**
 * @file src/components/navigation/Footer/Footer.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Site footer with brutal styling
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import type { IconType } from "react-icons";

export interface FooterLink {
  label: string;
  href: string;
  icon?: IconType;
}

export interface FooterProps {
  copyright?: string;
  location?: string;
  links?: FooterLink[];
  showGitHash?: boolean;
  gitRepo?: string;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  copyright = `© ${new Date().getFullYear()} All Rights Reserved`,
  location,
  links = [],
  showGitHash = false,
  gitRepo,
  className,
}) => {
  const [gitHash, setGitHash] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (showGitHash && gitRepo) {
      // Extract owner/repo from URL
      const match = gitRepo.match(/github\.com\/([^\/]+\/[^\/]+)/);
      if (match) {
        const [, repoPath] = match;
        fetch(`https://api.github.com/repos/${repoPath}/commits/main`)
          .then((res) => res.json())
          .then((data) => {
            if (data.sha) {
              setGitHash(data.sha.substring(0, 7));
            }
          })
          .catch(() => {
            // Silently fail
          });
      }
    }
  }, [showGitHash, gitRepo]);

  if (!mounted) {
    return <footer className="h-20 bg-brutal-gray-100" />;
  }

  return (
    <footer
      className={clsx(
        "bg-brutal-gray-100 text-brutal-black py-4 border-t-4 border-brutal-black",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-xs font-mono transform hover:-skew-x-6 transition-transform duration-300">
            {copyright}
          </p>

          {/* Location */}
          {location && (
            <p className="text-xs font-bold uppercase tracking-wider">
              {location}
            </p>
          )}

          {/* Links and Git info */}
          <div className="flex items-center gap-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-wider text-brutal-black hover:text-brutal-pink transition-colors flex items-center gap-1"
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </a>
            ))}

            {showGitHash && gitHash && (
              <a
                href={`${gitRepo}/commit/${gitHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-brutal-gray-600 hover:text-brutal-pink transition-colors"
              >
                #{gitHash}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

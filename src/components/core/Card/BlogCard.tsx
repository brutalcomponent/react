/**
 * @file src/components/core/Card/BlogCard.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Blog card component for displaying post previews with metadata.
 */
import React from "react";
import { clsx } from "clsx";
import { Icon, FaCalendar, FaClock, FaEye, FaArrowRight } from "../Icon";
import { Badge } from "../Badge";

export interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  href: string;
  views?: number;
  readingTime?: string;
  tags?: string[];
  brutal?: boolean;
  accentColor?: string;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  date,
  href,
  views,
  readingTime,
  tags,
  brutal = true,
  accentColor = "brutal-pink",
  className,
}) => {
  return (
    <a
      href={href}
      className={clsx(
        "block group relative overflow-hidden p-6",
        brutal
          ? "bg-brutal-white border-4 border-brutal-black shadow-brutal"
          : "bg-brutal-white border border-brutal-gray-300 shadow-md",
        brutal &&
          "hover:shadow-brutal-md hover:-translate-x-0.5 hover:-translate-y-0.5",
        brutal && "hover:scale-[1.02] hover:-rotate-1",
        `border-l-8 border-l-${accentColor}`,
        "transition-all duration-300",
        className,
      )}
    >
      {/* Hover accent */}
      {brutal && (
        <div
          className={clsx(
            "absolute top-0 right-0 w-16 h-16 opacity-10 rounded-full -mr-8 -mt-8",
            "group-hover:scale-150 transition-transform duration-300",
            `bg-${accentColor}`,
          )}
        />
      )}

      {/* Title */}
      <h3
        className={clsx(
          "text-2xl font-black uppercase tracking-wider mb-2",
          "text-brutal-black group-hover:text-brutal-pink transition-colors",
        )}
      >
        {title}
      </h3>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono text-brutal-gray-600 mb-4">
        <span className="flex items-center gap-1">
          <Icon icon={FaCalendar} size="xs" />
          {new Date(date).toLocaleDateString()}
        </span>
        {readingTime && (
          <span className="flex items-center gap-1">
            <Icon icon={FaClock} size="xs" />~{readingTime} min
          </span>
        )}
        {views !== undefined && (
          <span className="flex items-center gap-1">
            <Icon icon={FaEye} size="xs" />
            {views.toLocaleString()} views
          </span>
        )}
      </div>

      {/* Excerpt */}
      <p className="text-brutal-gray-700 mb-4 font-mono text-sm leading-relaxed line-clamp-3">
        {excerpt}
      </p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} size="xs" variant="secondary" brutal={brutal}>
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Read more */}
      <div
        className={clsx(
          "flex items-center gap-2 font-bold uppercase tracking-wider text-sm",
          "text-brutal-black group-hover:text-brutal-pink transition-all",
        )}
      >
        <span>Read more</span>
        <Icon
          icon={FaArrowRight}
          size="sm"
          className="transform transition-transform group-hover:translate-x-2"
        />
      </div>
    </a>
  );
};

/**
 * @component BlogCardSkeleton
 * @description Skeleton loader for BlogCard.
 */
export const BlogCardSkeleton: React.FC<{
  className?: string;
  accentColor?: string;
  brutal?: boolean;
}> = ({ className, accentColor = "brutal-pink", brutal = true }) => (
  <div
    className={clsx(
      "p-6 animate-pulse",
      brutal
        ? "bg-brutal-white border-4 border-brutal-black shadow-brutal"
        : "bg-brutal-white border border-brutal-gray-300 shadow-md",
      `border-l-8 border-l-${accentColor}`,
      className,
    )}
  >
    <div className="h-8 bg-brutal-gray-200 rounded w-3/4 mb-2" />
    <div className="flex gap-4 mb-4">
      <div className="h-4 bg-brutal-gray-200 rounded w-20" />
      <div className="h-4 bg-brutal-gray-200 rounded w-16" />
      <div className="h-4 bg-brutal-gray-200 rounded w-16" />
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-brutal-gray-200 rounded" />
      <div className="h-4 bg-brutal-gray-200 rounded w-5/6" />
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="h-5 bg-brutal-gray-200 rounded w-12" />
      <div className="h-5 bg-brutal-gray-200 rounded w-16" />
    </div>
    <div className="h-6 bg-brutal-gray-200 rounded w-24" />
  </div>
);

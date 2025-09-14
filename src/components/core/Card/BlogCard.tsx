/**
 * @file src/components/core/Card/BlogCard.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Blog card component for displaying post previews with metadata
 * Matches original dvh.sh styling exactly
 */
import React from "react";
import {
  FaArrowRight,
  FaBook,
  FaCalendarAlt,
  FaEye,
  FaGlobe,
  FaUtensils,
} from "react-icons/fa";
import { Icon } from "../Icon";
import { Badge } from "../Badge";
import { cn } from "../../../utils/cn.utils";

export interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  href: string;
  views?: number;
  readingTime?: string;
  tags?: string[];
  origin?: string;
  type?: string;
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
  origin,
  type,
  brutal = true,
  accentColor = "brutal-pink",
  className,
}) => {
  const isCooking = origin && type;

  return (
    <div
      className={cn(
        // Base styling - match original exactly
        "bg-brutal-surface0 p-6 shadow-lg flex flex-col h-full relative overflow-hidden",
        "border-l-4 border-accent transition-all duration-300",
        "hover:scale-[1.03] hover:-rotate-1",

        className,
      )}
    >
      <div className="flex flex-col mb-4">
        <h3 className="text-2xl font-bold text-accent mb-2 uppercase tracking-wide">
          {title}
        </h3>
        <div className="flex items-center text-brutal-gray-600 space-x-4 text-sm flex-wrap">
          <div className="flex items-center">
            <Icon icon={FaCalendarAlt} size="xs" className="mr-1" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          {readingTime && (
            <div className="flex items-center">
              <Icon icon={FaBook} size="xs" className="mr-1" />
              <span>~{readingTime} min</span>
            </div>
          )}
          {views !== undefined && (
            <div className="flex items-center">
              <Icon icon={FaEye} size="xs" className="mr-1" />
              <span>{views} views</span>
            </div>
          )}
          {origin && (
            <div className="flex items-center">
              <Icon icon={FaGlobe} size="xs" className="mr-1" />
              <span>{origin}</span>
            </div>
          )}
          {type && (
            <div className="flex items-center">
              <Icon icon={FaUtensils} size="xs" className="mr-1" />
              <span>{type}</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-brutal-gray-700 mb-4 flex-grow font-mono text-sm">
        {excerpt}
      </p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, idx) => (
            <Badge key={idx} size="xs" variant="secondary" brutal={brutal}>
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <a
        href={isCooking ? `/cooking/${href}` : `/blog/${href}`}
        className="text-brutal-sky hover:text-accent transition-colors duration-200 flex items-center group self-start"
      >
        <span className="mr-2 uppercase tracking-wide font-bold">
          Read more
        </span>
        <Icon
          icon={FaArrowRight}
          size="sm"
          className="transition-transform duration-300 group-hover:translate-x-2"
        />
      </a>

      <div className="absolute top-0 right-0 w-16 h-16 bg-accent opacity-10 rounded-full -mr-8 -mt-8"></div>
    </div>
  );
};

/**
 * @component BlogCardSkeleton
 * @description Skeleton loader for BlogCard
 */
export const BlogCardSkeleton: React.FC<{
  className?: string;
  accentColor?: string;
  brutal?: boolean;
}> = ({ className, accentColor = "brutal-pink", brutal = true }) => (
  <div
    className={cn(
      "bg-brutal-surface0 p-6 shadow-lg flex flex-col h-full relative overflow-hidden",
      "border-l-4 border-accent transition-all duration-300 animate-pulse",
      className,
    )}
  >
    <div className="flex flex-col mb-4">
      <div className="h-6 bg-accent mb-2 w-3/4"></div>
      <div className="flex items-center text-brutal-gray-600 space-x-4 text-sm flex-wrap">
        <div className="flex items-center">
          <div className="h-4 bg-brutal-gray-600 w-16 mr-1"></div>
        </div>
        <div className="flex items-center">
          <div className="h-4 bg-brutal-gray-600 w-12 mr-1"></div>
        </div>
        <div className="flex items-center">
          <div className="h-4 bg-brutal-gray-600 w-16 mr-1"></div>
        </div>
      </div>
    </div>
    <div className="text-brutal-gray-700 mb-4 flex-grow font-mono text-sm">
      <div className="h-4 bg-brutal-gray-700 w-full mb-2"></div>
      <div className="h-4 bg-brutal-gray-700 w-5/6 mb-2"></div>
      <div className="h-4 bg-brutal-gray-700 w-4/6"></div>
    </div>
    <div className="text-brutal-sky hover:text-accent transition-colors duration-200 flex items-center group self-start">
      <div className="h-4 bg-brutal-sky w-24"></div>
    </div>
    <div className="absolute top-0 right-0 w-16 h-16 bg-accent opacity-10 rounded-full -mr-8 -mt-8"></div>
  </div>
);

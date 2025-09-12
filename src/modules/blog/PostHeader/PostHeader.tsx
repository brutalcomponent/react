/**
 * @file src/modules/blog/PostHeader/PostHeader.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Header section for blog posts with metadata
 */
import React from "react";
import { clsx } from "clsx";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaEye,
  FaGlobe,
  FaUtensils,
  FaClock,
} from "react-icons/fa";
import { Icon } from "../../../components/core/Icon";

export interface PostHeaderProps {
  title: string;
  date: string;
  views?: number;
  readingTime?: string;
  backHref?: string;
  backLabel?: string;
  isCooking?: boolean;
  origin?: string;
  type?: string;
  cookingTime?: string;
  className?: string;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  date,
  views,
  readingTime,
  backHref = "/blog",
  backLabel = "Back to all posts",
  isCooking = false,
  origin,
  type,
  cookingTime,
  className,
}) => {
  return (
    <div
      className={clsx(
        "mb-12 bg-brutal-gray-100 p-6 shadow-brutal transform -skew-x-2",
        "border-4 border-brutal-black",
        className,
      )}
    >
      <div className="transform skew-x-2">
        {/* Back link and metadata */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <a
            href={backHref}
            className="inline-flex items-center text-brutal-pink hover:text-brutal-peach transition-colors duration-200 mb-4 md:mb-0 group"
          >
            <Icon
              icon={FaArrowLeft}
              size="sm"
              className="mr-2 animate-pulse group-hover:translate-x-[-4px] transition-transform"
            />
            <span className="uppercase tracking-wide font-bold">
              {backLabel}
            </span>
          </a>

          {/* Metadata */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-brutal-gray-600 text-xs font-mono">
            <div className="flex items-center">
              <Icon icon={FaCalendarAlt} size="xs" className="mr-1" />
              <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
            </div>

            {views !== undefined && (
              <div className="flex items-center">
                <Icon icon={FaEye} size="xs" className="mr-1" />
                <span>{views} views</span>
              </div>
            )}

            {readingTime && (
              <div className="flex items-center">
                <Icon icon={FaClock} size="xs" className="mr-1" />
                <span>{readingTime} min read</span>
              </div>
            )}

            {cookingTime && (
              <div className="flex items-center">
                <Icon icon={FaUtensils} size="xs" className="mr-1" />
                <span>{cookingTime}</span>
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

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-brutal-black uppercase tracking-wide leading-tight transform hover:skew-x-2 transition-transform duration-300">
          {title}
        </h1>
      </div>
    </div>
  );
};

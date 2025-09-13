/**
 * @file src/components/core/Card/ExperienceCard.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Experience/work history card with keyword highlighting and duration display
 */
import React, { Fragment } from "react";
import { clsx } from "clsx";
import { FaBriefcase, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Icon } from "../Icon";
import { emphasizeText } from "../../../utils/text.utils";
import { formatDuration, parseLooseDate } from "../../../utils/date.utils";
import { getAccentClasses, brutalBase, cn } from "../../../utils/cn.utils";

export interface ExperienceCardProps {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  type?: string;
  description?: string;
  bullets?: string[];
  keywords?: string[];
  brutal?: boolean;
  variant?: "default" | "compact" | "detailed";
  accentColor?: string;
  className?: string;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  location,
  startDate,
  endDate,
  type,
  description,
  bullets,
  keywords = [],
  brutal = true,
  variant = "default",
  accentColor = "brutal-pink",
  className,
}) => {
  // Calculate duration
  const duration = formatDuration(
    parseLooseDate(startDate),
    endDate ? parseLooseDate(endDate) : null,
  );

  // Get accent classes
  const accent = getAccentClasses(accentColor);

  // Highlight keywords
  const highlightedDescription = description
    ? emphasizeText(description, keywords)
    : [];
  const highlightedBullets = bullets?.map((bullet) =>
    emphasizeText(bullet, keywords),
  );

  return (
    <div
      className={cn(
        // Base styling
        "relative p-6 overflow-hidden",
        
        // Brutal styling
        brutal ? [
          brutalBase.surface,
          brutalBase.border,
          brutalBase.shadow,
          brutalBase.skew,
          brutalBase.hover,
          brutalBase.transition,
          // Accent border
          "border-l-8",
          accent.borderLeft,
        ] : [
          brutalBase.surface,
          "border border-brutal-gray-300 shadow-md",
          "hover:shadow-lg",
          brutalBase.transition,
        ],
        
        className,
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
        <div className={brutal ? "transform skew-x-2" : ""}>
          <h3
            className={cn(
              "text-2xl font-black uppercase tracking-wider mb-1",
              accent.text,
              brutal && "transform -skew-x-3",
            )}
          >
            {title}
          </h3>
          <p className="text-lg font-bold text-brutal-gray-700">
            {company}
          </p>
        </div>

        {variant !== "compact" && (
          <div className="text-right">
            <div className="flex items-center gap-2 text-brutal-gray-600 text-xs font-mono">
              <Icon icon={FaClock} size="xs" />
              <span>
                {startDate} - {endDate || "Present"}
              </span>
            </div>
            <span
              className={cn(
                "inline-block text-xs font-black uppercase tracking-wider mt-1 px-2 py-1",
                "bg-brutal-gray-100 border-2 border-brutal-black",
                accent.text,
                brutal && "transform rotate-1",
              )}
            >
              {duration}
            </span>
          </div>
        )}
      </div>

      {/* Meta */}
      {(type || location) && variant !== "compact" && (
        <div className="flex flex-wrap gap-4 text-xs text-brutal-gray-600 mb-4 font-mono">
          {type && (
            <div className="flex items-center gap-1">
              <Icon icon={FaBriefcase} size="xs" />
              <span>{type}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-1">
              <Icon icon={FaMapMarkerAlt} size="xs" />
              <span>{location}</span>
            </div>
          )}
        </div>
      )}

      {/* Description */}
      {description && variant !== "compact" && (
        <p className="text-sm text-brutal-gray-700 mb-4 leading-relaxed">
          {highlightedDescription.map((segment, idx) =>
            segment.bold ? (
              <strong
                key={idx}
                className={cn("font-black", accent.text)}
              >
                {segment.text}
              </strong>
            ) : (
              <Fragment key={idx}>{segment.text}</Fragment>
            ),
          )}
        </p>
      )}

      {/* Bullets */}
      {bullets && bullets.length > 0 && variant === "detailed" && (
        <ul className="space-y-2">
          {highlightedBullets?.map((bulletSegments, idx) => (
            <li key={idx} className="flex text-sm text-brutal-gray-700">
              <span
                className={cn(
                  "font-black mr-2 flex-shrink-0",
                  accent.text,
                )}
              >
                →
              </span>
              <span>
                {bulletSegments.map((segment, segIdx) =>
                  segment.bold ? (
                    <strong
                      key={segIdx}
                      className={cn("font-black", accent.text)}
                    >
                      {segment.text}
                    </strong>
                  ) : (
                    <Fragment key={segIdx}>{segment.text}</Fragment>
                  ),
                )}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Inner decoration for extra brutal effect */}
      {brutal && (
        <div className="pointer-events-none absolute inset-2 border-2 border-brutal-black opacity-10" />
      )}
    </div>
  );
};

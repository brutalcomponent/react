/**
 * @file src/components/core/Card/ExperienceCard.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
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

  // Highlight keywords
  const highlightedDescription = description
    ? emphasizeText(description, keywords)
    : [];
  const highlightedBullets = bullets?.map((bullet) =>
    emphasizeText(bullet, keywords),
  );

  return (
    <div
      className={clsx(
        "relative p-6",
        brutal
          ? "bg-brutal-white border-4 border-brutal-black shadow-brutal"
          : "bg-brutal-white border border-brutal-gray-300 shadow-md",
        brutal && "hover:shadow-brutal-md hover:-translate-y-0.5",
        "transition-all duration-300",
        brutal && "hover:rotate-0",
        brutal && "transform -rotate-1",
        className,
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
        <div>
          <h3
            className={clsx(
              "text-2xl font-black uppercase tracking-wider",
              `text-${accentColor}`,
              brutal && "transform -skew-x-3",
            )}
          >
            {title}
          </h3>
          <p className="text-lg font-bold mt-1">{company}</p>
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
              className={clsx(
                "inline-block text-xs font-black uppercase tracking-wider mt-1 px-2 py-1",
                "bg-brutal-gray-100 border-2 border-brutal-black",
                `text-${accentColor}`,
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
                className={clsx("font-black", `text-${accentColor}`)}
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
                className={clsx(
                  "font-black mr-2 flex-shrink-0",
                  `text-${accentColor}`,
                )}
              >
                →
              </span>
              <span>
                {bulletSegments.map((segment, segIdx) =>
                  segment.bold ? (
                    <strong
                      key={segIdx}
                      className={clsx("font-black", `text-${accentColor}`)}
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
    </div>
  );
};

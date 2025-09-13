/**
 * @file src/components/core/Card/PositionCard.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Position/role card for career showcase
 */
import React from "react";
import { clsx } from "clsx";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Icon } from "../Icon";
import { Badge } from "../Badge";

import { getAccentClasses } from "../../../utils";

export interface PositionCardProps {
  company: string;
  position: string;
  description: string;
  technologies: string[];
  companyLink?: string;
  dateRange: string;
  location?: string;
  achievements?: string[];
  variant?: "default" | "compact" | "featured";
  brutal?: boolean;
  accentColor?: string;
  className?: string;
}

export const PositionCard: React.FC<PositionCardProps> = ({
  company,
  position,
  description,
  technologies,
  companyLink,
  dateRange,
  location,
  achievements = [],
  variant = "default",
  brutal = true,
  accentColor = "brutal-pink",
  className,
}) => {

  const accentClasses = getAccentClasses(accentColor);

  return (
    <div
      className={clsx(
        "p-6 transition-all duration-300",
        brutal && [
          "bg-brutal-white shadow-brutal",
          "transform -skew-x-2 border-l-4",
          "border-t-4 border-r-4 border-b-4 border-brutal-black",
          `border-l-8 border-l-${accentClasses.borderLeft}`,
          "hover:shadow-brutal-md hover:skew-x-0 hover:scale-[1.01]",
        ],
        !brutal && [
          "bg-brutal-white shadow-md",
          "border border-brutal-gray-300",
          `border-l-4 border-l-${accentClasses.borderLeft}`,
        ],
        className,
      )}
    >
      <div className={clsx(brutal && "transform skew-x-2")}>
        {/* Company & Date */}
        <div className="flex flex-col mb-4">
          <h3
            className={clsx(
              "text-3xl font-bold mb-1 uppercase tracking-wide",
              `text-${accentClasses.text}`,
            )}
          >
            {company}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-brutal-gray-600 font-mono">
            <span>{dateRange}</span>
            {location && <span>{location}</span>}
          </div>
        </div>

        {/* Position */}
        <h4 className="text-2xl font-semibold text-brutal-black mb-3">
          {position}
        </h4>

        {/* Description */}
        {variant !== "compact" && (
          <p className="text-brutal-gray-700 mb-4 text-base font-mono leading-relaxed">
            {description}
          </p>
        )}

        {/* Achievements */}
        {achievements.length > 0 && variant === "featured" && (
          <div className="mb-4">
            <h5 className="text-sm font-bold uppercase tracking-wider mb-2">
              Key Achievements
            </h5>
            <ul className="space-y-1">
              {achievements.map((achievement, idx) => (
                <li
                  key={idx}
                  className="flex items-start text-sm text-brutal-gray-700"
                >
                  <span className={clsx("mr-2", `text-${accentColor}`)}>•</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, idx) => (
              <Badge key={idx} size="sm" variant="secondary" brutal={brutal}>
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Company link */}
        {companyLink && (
          <a
            href={companyLink}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              "inline-flex items-center gap-2",
              `text-${accentColor} hover:text-brutal-peach`,
              "text-lg font-bold transition-colors",
            )}
          >
            Company Website
            <Icon icon={FaExternalLinkAlt} size="md" />
          </a>
        )}
      </div>
    </div>
  );
};

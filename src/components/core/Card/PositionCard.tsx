/**
 * @file src/components/core/Card/PositionCard.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Position/role card for career showcase
 * Matches original dvh.sh styling exactly
 */
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Icon } from "../Icon";
import { Badge } from "../Badge";
import { getAccentClasses, cn } from "../../../utils/cn.utils";

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
  return (
    <div
      className={cn(
        // Base styling - match original exactly
        "bg-brutal-surface0 p-6 shadow-md hover:shadow-lg transition-shadow duration-300",
        "transform -skew-x-2 border-l-4 border-accent",

        className,
      )}
    >
      <div className="flex flex-col mb-4">
        <h3 className="text-3xl font-bold text-accent mb-1 uppercase tracking-wide">
          {company}
        </h3>
        <span className="text-lg text-brutal-gray-600 font-mono">
          {dateRange}
        </span>
      </div>

      <h4 className="text-2xl font-semibold text-brutal-gray-700 mb-3 transform skew-x-2">
        {position}
      </h4>

      <p className="text-brutal-gray-700 mb-4 text-base font-mono leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, idx) => (
          <Badge key={idx} size="sm" variant="secondary" brutal={brutal}>
            {tech}
          </Badge>
        ))}
      </div>

      {companyLink && (
        <a
          href={companyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-accent hover:underline text-lg font-bold"
        >
          Company Website
          <Icon icon={FaExternalLinkAlt} size="md" className="ml-2" />
        </a>
      )}
    </div>
  );
};

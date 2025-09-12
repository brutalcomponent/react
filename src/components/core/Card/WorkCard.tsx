/**
 * @file src/components/core/Card/WorkCard.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Client work showcase card with technology display
 */
import React, { Fragment } from "react";
import { clsx } from "clsx";
import { FaExternalLinkAlt, FaCode, FaCalendar } from "react-icons/fa";
import { Icon } from "../Icon";
import { Badge } from "../Badge";
import { emphasizeText } from "../../../utils/text.utils";

export interface WorkCardProps {
  title: string;
  shortDescription: string;
  technologies: string[];
  link?: string;
  date: string;
  client?: string;
  testimonial?: string;
  keywords?: string[];
  brutal?: boolean;
  accentColor?: string;
  className?: string;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  title,
  shortDescription,
  technologies,
  link,
  date,
  client,
  testimonial,
  keywords = [],
  brutal = true,
  accentColor = "brutal-pink",
  className,
}) => {
  const highlightedDescription = emphasizeText(shortDescription, keywords);

  return (
    <div
      className={clsx(
        "relative overflow-hidden",
        brutal
          ? "bg-brutal-white border-4 border-brutal-black p-6 shadow-brutal"
          : "bg-brutal-white border border-brutal-gray-300 p-6 shadow-md",
        brutal &&
          "hover:shadow-brutal-md hover:-translate-x-0.5 hover:-translate-y-0.5",
        "hover:rotate-0 transition-all duration-300",
        brutal && "transform rotate-1",
        className,
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
        <div>
          <h3
            className={clsx(
              "text-2xl font-black uppercase tracking-wider",
              `text-${accentColor}`,
              brutal && "transform -skew-x-6",
            )}
          >
            {title}
          </h3>
          {client && (
            <p className="text-sm font-bold text-brutal-gray-600 mt-1">
              for {client}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 text-brutal-gray-600">
          <Icon icon={FaCalendar} size="xs" />
          <span className="font-mono text-xs font-bold">{date}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-brutal-gray-700 mb-4 font-mono text-sm leading-relaxed">
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

      {/* Testimonial */}
      {testimonial && (
        <blockquote
          className={clsx(
            "mb-4 p-3 italic",
            "bg-brutal-gray-100 border-l-4",
            `border-${accentColor}`,
          )}
        >
          <p className="text-sm text-brutal-gray-700">"{testimonial}"</p>
        </blockquote>
      )}

      {/* Technologies */}
      {technologies.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Icon icon={FaCode} size="xs" className="text-brutal-gray-600" />
            <span className="text-xs font-bold text-brutal-gray-600 uppercase tracking-wider">
              Built with
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, idx) => (
              <Badge key={idx} size="xs" variant="secondary" brutal={brutal}>
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Link */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "inline-flex items-center gap-2 font-black uppercase tracking-wider",
            "px-3 py-2 transition-all duration-200",
            brutal && "border-2 shadow-brutal hover:shadow-brutal-md",
            !brutal && "border",
            "text-brutal-black border-brutal-black bg-transparent",
            "hover:bg-brutal-black hover:text-brutal-white",
          )}
        >
          Live Demo
          <Icon icon={FaExternalLinkAlt} size="sm" />
        </a>
      )}

      {/* Decorative corner */}
      {brutal && (
        <div
          className={clsx(
            "absolute top-0 right-0 w-16 h-16 opacity-10 -mr-8 -mt-8",
            `bg-${accentColor}`,
          )}
        />
      )}
    </div>
  );
};

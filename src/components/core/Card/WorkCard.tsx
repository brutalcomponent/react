/**
 * @file src/components/core/Card/WorkCard.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Client work showcase card with technology display
 * Matches original dvh.sh styling exactly
 */
import React, { Fragment } from "react";
import { FaExternalLinkAlt, FaCode, FaCalendar } from "react-icons/fa";
import { Icon } from "../Icon";
import { Badge } from "../Badge";
import { emphasizeText } from "../../../utils/text.utils";
import { cn } from "../../../utils/cn.utils";

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

  // Normalize technologies array
  const normalizedTechs = Array.isArray(technologies)
    ? technologies.map((tech) => tech.toLowerCase())
    : [];

  const safeLink =
    link && typeof link === "string" && link.startsWith("http")
      ? link
      : `https://${String(link ?? "")}`;

  return (
    <div
      className={cn(
        // Base styling - match original exactly
        "relative bg-brutal-surface0 border-4 border-accent p-6 shadow-brutal overflow-hidden",
        "transform rotate-1 hover:rotate-0 hover:scale-1.02 hover:translate-x-1.5",
        "transition-all duration-300",

        className,
      )}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
        <div>
          <h3 className="text-2xl font-black text-accent uppercase tracking-wider transform -skew-x-6">
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

      <p className="text-brutal-gray-700 mb-4 font-mono text-sm leading-relaxed">
        {highlightedDescription.map((segment, idx) =>
          segment.bold ? (
            <strong
              key={idx}
              className="font-black text-brutal-pink inline-block"
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
        <blockquote className="mb-4 p-3 italic bg-brutal-gray-100 border-l-4 border-accent">
          <p className="text-sm text-brutal-gray-700">"{testimonial}"</p>
        </blockquote>
      )}

      {normalizedTechs.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Icon icon={FaCode} size="xs" className="text-brutal-gray-600" />
            <span className="text-xs font-bold text-brutal-gray-600 uppercase tracking-wider">
              Built with
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {normalizedTechs.map((tech, idx) => (
              <Badge key={idx} size="xs" variant="secondary" brutal={brutal}>
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {link && (
        <a
          href={safeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent font-black uppercase tracking-wider px-3 py-2 border-2 border-accent bg-transparent shadow-brutal hover:bg-accent hover:text-brutal-black transition-colors"
        >
          Live Demo
          <Icon icon={FaExternalLinkAlt} size="sm" />
        </a>
      )}

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-accent opacity-10 -mr-8 -mt-8" />
    </div>
  );
};

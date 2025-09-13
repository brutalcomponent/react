/**
 * @file src/components/core/Card/ProjectCard.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Project showcase card with keyword emphasis and technology display
 * Matches original dvh.sh styling exactly
 */
import React, { Fragment } from "react";
import { FaExternalLinkAlt, FaGithub, FaCode } from "react-icons/fa";
import { Icon } from "../Icon";
import { Badge } from "../Badge";
import { emphasizeText } from "../../../utils/text.utils";
import { cn } from "../../../utils/cn.utils";

export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  sourceLink?: string;
  image?: string;
  keywords?: string[];
  variant?: "default" | "compact" | "featured";
  brutal?: boolean;
  accentColor?: string;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  demoLink,
  sourceLink,
  image,
  keywords = [],
  variant = "default",
  brutal = true,
  accentColor = "brutal-pink",
  className,
}) => {
  const highlightedDescription = emphasizeText(description, keywords);

  return (
    <div
      className={cn(
        // Base styling - match original exactly
        "relative bg-brutal-surface0 border-4 border-accent p-6 shadow-brutal",
        "overflow-hidden flex flex-col h-full",
        
        className,
      )}
    >
      <h3 className="text-2xl font-black text-accent mb-3 uppercase tracking-wider transform -skew-x-6">
        {title}
      </h3>

      <p className="text-brutal-gray-700 mb-4 font-mono text-sm leading-relaxed flex-grow">
        {highlightedDescription.map((segment, idx) =>
          segment.bold ? (
            <strong key={idx} className="font-black text-brutal-pink inline-block">
              {segment.text}
            </strong>
          ) : (
            <Fragment key={idx}>{segment.text}</Fragment>
          ),
        )}
      </p>

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

      <div className="flex gap-3 mt-auto">
        {demoLink && (
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-black uppercase tracking-wider px-3 py-2 border-2 transition-all duration-200 shadow-brutal border-accent bg-accent text-brutal-black hover:bg-transparent hover:text-accent"
          >
            <Icon icon={FaExternalLinkAlt} size="sm" />
            <span className="text-xs">Demo</span>
          </a>
        )}
        {sourceLink && (
          <a
            href={sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-black uppercase tracking-wider px-3 py-2 border-2 transition-all duration-200 shadow-brutal border-accent text-accent hover:bg-accent hover:text-brutal-black"
          >
            <Icon icon={FaGithub} size="sm" />
            <span className="text-xs">Code</span>
          </a>
        )}
      </div>
    </div>
  );
};

/**
 * @file src/components/core/Card/ProjectCard.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Project showcase card with keyword emphasis and technology display
 */
import React, { Fragment } from "react";
import { clsx } from "clsx";
import { FaExternalLinkAlt, FaGithub, FaCode } from "react-icons/fa";
import { Icon } from "../Icon";
import { Badge } from "../Badge";
import { emphasizeText } from "../../../utils/text.utils";

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
      className={clsx(
        "relative overflow-hidden flex flex-col h-full",
        brutal
          ? "bg-brutal-white border-4 border-brutal-black shadow-brutal"
          : "bg-brutal-white border border-brutal-gray-300 shadow-md",
        brutal && "hover:shadow-brutal-md hover:-translate-y-0.5",
        "transition-all duration-300",
        brutal && "transform hover:rotate-0",
        brutal && variant === "default" && "rotate-1",
        brutal && variant === "featured" && "-rotate-1",
        className,
      )}
    >
      {/* Image */}
      {image && variant !== "compact" && (
        <div className="relative h-48 -mx-px -mt-px overflow-hidden border-b-4 border-brutal-black">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {variant === "featured" && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-brutal-black text-brutal-white text-xs font-bold uppercase">
              Featured
            </div>
          )}
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3
          className={clsx(
            "text-2xl font-black uppercase tracking-wider mb-3",
            `text-${accentColor}`,
            brutal && "transform -skew-x-6",
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-brutal-gray-700 mb-4 font-mono leading-relaxed flex-grow">
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

        {/* Technologies */}
        {technologies.length > 0 && variant !== "compact" && (
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

        {/* Links */}
        <div className="flex gap-3 mt-auto">
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "inline-flex items-center gap-2 font-black uppercase tracking-wider",
                "px-3 py-2 transition-all duration-200",
                brutal && "border-2 shadow-brutal hover:shadow-brutal-md",
                !brutal && "border",
                "bg-brutal-black text-brutal-white border-brutal-black",
                "hover:bg-brutal-gray-800",
              )}
              aria-label="View demo"
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
              className={clsx(
                "inline-flex items-center gap-2 font-black uppercase tracking-wider",
                "px-3 py-2 transition-all duration-200",
                brutal && "border-2 shadow-brutal hover:shadow-brutal-md",
                !brutal && "border",
                "bg-brutal-white text-brutal-black border-brutal-black",
                "hover:bg-brutal-gray-100",
              )}
              aria-label="View source"
            >
              <Icon icon={FaGithub} size="sm" />
              <span className="text-xs">Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

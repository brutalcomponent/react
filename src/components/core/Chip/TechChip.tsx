/**
 * @file src/components/core/Chip/TechChip.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Technology chip with icon support and tech-specific styling
 */
import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { Chip } from "./Chip";
import { getTechIcon, normalizeTechName } from "../../../utils/tech.utils";
import type { IconType } from "react-icons";
import { ChipGroup } from "./ChipGroup";

export interface TechChipProps {
  name: string;
  icon?: string | IconType;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg";
  onClick?: () => void;
  brutal?: boolean;
  showIcon?: boolean;
  className?: string;
}

export const TechChip: React.FC<TechChipProps> = ({
  name,
  icon,
  color,
  size = "sm",
  onClick,
  brutal = true,
  showIcon = true,
  className,
}) => {
  const [rotation, setRotation] = useState(0);
  const [skew, setSkew] = useState(0);

  useEffect(() => {
    // Only set random values on client for brutalist effect
    setRotation(Math.random() * 4 - 2);
    setSkew(Math.random() * 4 - 2);
  }, []);

  // Normalize tech name
  const normalizedName = normalizeTechName(name);

  // Get icon component
  let IconComponent: IconType | null = null;
  if (showIcon) {
    if (typeof icon === "string") {
      IconComponent = getTechIcon(icon);
    } else if (typeof icon === "function") {
      IconComponent = icon;
    } else {
      // Try to auto-detect icon based on tech name
      IconComponent = getTechIcon(
        `Si${normalizedName.replace(/[^a-zA-Z]/g, "")}`,
      );
    }
  }

  const chipStyle = brutal
    ? {
        transform: `rotate(${rotation}deg) skewX(${skew}deg)`,
      }
    : undefined;

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (brutal && e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.transform = "rotate(0deg) skewX(0deg) scale(1.1)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (brutal && e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.transform = `rotate(${rotation}deg) skewX(${skew}deg) scale(1)`;
    }
  };

  return (
    <div
      style={chipStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx("inline-block", className)}
    >
      <Chip
        variant="secondary"
        size={size}
        icon={IconComponent || undefined}
        onClick={onClick}
        brutal={brutal}
        className={clsx(
          color,
          brutal &&
            "hover:shadow-brutal-md hover:scale-110 cursor-default select-none",
        )}
      >
        {normalizedName}
      </Chip>
    </div>
  );
};

/**
 * @component TechChipGroup
 * @description Specialized ChipGroup for technology chips
 */
export interface TechChipGroupProps {
  technologies: Array<{
    name: string;
    icon?: string | IconType;
    color?: string;
  }>;
  size?: TechChipProps["size"];
  maxItems?: number;
  brutal?: boolean;
  showIcons?: boolean;
  onChipClick?: (tech: string) => void;
  className?: string;
}

export const TechChipGroup: React.FC<TechChipGroupProps> = ({
  technologies,
  size = "sm",
  maxItems,
  brutal = true,
  showIcons = true,
  onChipClick,
  className,
}) => {
  const [showAll, setShowAll] = useState(false);

  const visibleTechs =
    showAll || !maxItems ? technologies : technologies.slice(0, maxItems);

  return (
    <ChipGroup
      maxItems={showAll ? undefined : maxItems}
      showMore={!showAll && !!maxItems && technologies.length > maxItems}
      onShowMore={() => setShowAll(true)}
      className={className}
    >
      {visibleTechs.map((tech, index) => (
        <TechChip
          key={`${tech.name}-${index}`}
          name={tech.name}
          icon={tech.icon}
          color={tech.color}
          size={size}
          onClick={onChipClick ? () => onChipClick(tech.name) : undefined}
          brutal={brutal}
          showIcon={showIcons}
        />
      ))}
    </ChipGroup>
  );
};

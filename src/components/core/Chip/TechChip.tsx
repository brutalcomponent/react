/**
 * @file src/components/core/Chip/TechChip.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Technology chip with icon support and tech-specific styling
 * @client This component requires client-side JavaScript for brutal effects
 */
"use client";

import React, { useState, useEffect } from "react";
import { Chip } from "./Chip";
import { ChipGroup } from "./ChipGroup";
import { getTechIcon, normalizeTechName } from "../../../utils/tech.utils";
import { cn } from "../../../utils/cn.utils";
import type { IconType } from "react-icons";

export interface TechChipProps {
  name: string;
  icon?: string | IconType;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg";
  onClick?: () => void;
  brutal?: boolean;
  showIcon?: boolean;
  accentColor?: string;
  className?: string;
}

/**
 * @component TechChip
 * @description Specialized chip for displaying technologies with icons and brutal styling
 */
export const TechChip: React.FC<TechChipProps> = ({
  name,
  icon,
  color,
  size = "sm",
  onClick,
  brutal = true,
  showIcon = true,
  accentColor = "brutal-pink",
  className,
}) => {
  const [rotation, setRotation] = useState(0);
  const [skew, setSkew] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only set random values on client for brutalist effect
    if (brutal) {
      setRotation(Math.random() * 4 - 2);
      setSkew(Math.random() * 4 - 2);
    }
    setMounted(true);
  }, [brutal]);

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

  const chipStyle =
    brutal && mounted
      ? {
          transform: `rotate(${rotation}deg) skewX(${skew}deg)`,
          transition: "transform 0.3s ease",
        }
      : undefined;

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (brutal && mounted && e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.transform = "rotate(0deg) skewX(0deg) scale(1.05)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (brutal && mounted && e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.transform = `rotate(${rotation}deg) skewX(${skew}deg) scale(1)`;
    }
  };

  return (
    <div
      style={chipStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-block", brutal && "hover:z-10 relative", className)}
    >
      <Chip
        variant="secondary"
        size={size}
        icon={IconComponent || undefined}
        onClick={onClick}
        brutal={brutal}
        accentColor={accentColor}
        className={cn(
          color,
          brutal && [
            "hover:shadow-brutal-md cursor-default select-none",
            "transform-gpu will-change-transform",
          ],
          !brutal && "hover:scale-105",
        )}
      >
        {normalizedName}
      </Chip>
    </div>
  );
};

/**
 * @component TechChipGroup
 * @description Specialized ChipGroup for technology chips with show more functionality
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
  accentColor?: string;
  onChipClick?: (tech: string) => void;
  className?: string;
}

export const TechChipGroup: React.FC<TechChipGroupProps> = ({
  technologies,
  size = "sm",
  maxItems,
  brutal = true,
  showIcons = true,
  accentColor = "brutal-pink",
  onChipClick,
  className,
}) => {
  const [showAll, setShowAll] = useState(false);

  const visibleTechs =
    showAll || !maxItems ? technologies : technologies.slice(0, maxItems);
  const hasMore = !showAll && !!maxItems && technologies.length > maxItems;

  return (
    <ChipGroup
      maxItems={showAll ? undefined : maxItems}
      showMore={hasMore}
      onShowMore={() => setShowAll(true)}
      brutal={brutal}
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
          accentColor={accentColor}
        />
      ))}

      {hasMore && (
        <Chip
          variant="ghost"
          size={size}
          onClick={() => setShowAll(true)}
          brutal={brutal}
          accentColor={accentColor}
          className="opacity-70 hover:opacity-100"
        >
          +{technologies.length - maxItems!} more
        </Chip>
      )}
    </ChipGroup>
  );
};

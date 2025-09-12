/**
 * @file src/utils/tech.utils.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Technology/skill related utilities
 */
import type { IconType } from "react-icons";
import * as SiIcons from "react-icons/si";

export interface TechItem {
  slug: string;
  name: string;
  icon?: string;
  color?: string;
}

export const commonTechnologies: TechItem[] = [
  {
    slug: "javascript",
    name: "JavaScript",
    icon: "SiJavascript",
    color: "text-brutal-yellow",
  },
  {
    slug: "typescript",
    name: "TypeScript",
    icon: "SiTypescript",
    color: "text-brutal-sky",
  },
  { slug: "react", name: "React", icon: "SiReact", color: "text-brutal-sky" },
  {
    slug: "nextjs",
    name: "Next.js",
    icon: "SiNextdotjs",
    color: "text-brutal-black",
  },
  {
    slug: "nodejs",
    name: "Node.js",
    icon: "SiNodedotjs",
    color: "text-brutal-mint",
  },
  {
    slug: "python",
    name: "Python",
    icon: "SiPython",
    color: "text-brutal-yellow",
  },
  {
    slug: "docker",
    name: "Docker",
    icon: "SiDocker",
    color: "text-brutal-sky",
  },
  { slug: "git", name: "Git", icon: "SiGit", color: "text-brutal-coral" },
  // Add more as needed
];

export function getTechIcon(iconName?: string): IconType | null {
  if (!iconName) return null;
  return (SiIcons as any)[iconName] || null;
}

/**
 * @function normalizeTechName
 * @description Normalize technology names
 */
export function normalizeTechName(name: string): string {
  const normalizations: Record<string, string> = {
    "square api": "Square",
    "react.js": "React",
    "node.js": "Node.js",
    "next.js": "Next.js",
    "vue.js": "Vue",
    // Add more normalizations
  };

  const lower = name.toLowerCase();
  return normalizations[lower] || name;
}

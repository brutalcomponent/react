/**
 * @file src/utils/cn.utils.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Classname utilities
 */
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const brutalColorMap = {
  'brutal-pink': 'brutal-pink',
  'brutal-peach': 'brutal-peach', 
  'brutal-yellow': 'brutal-yellow',
  'brutal-mint': 'brutal-mint',
  'brutal-sky': 'brutal-sky',
  'brutal-lavender': 'brutal-lavender',
  'brutal-coral': 'brutal-coral',
} as const;

export type BrutalColor = keyof typeof brutalColorMap;

export const getBrutalClasses = (
  color: string,
  variants: ('text' | 'bg' | 'border' | 'border-l')[] = ['text']
) => {
  if (!color.startsWith('brutal-')) {
    color = `brutal-${color}`;
  }
  
  return variants.map(variant => `${variant}-${color}`).join(' ');
};

export const getAccentClasses = (accentColor: string) => {
  return {
    text: `text-${accentColor}`,
    borderLeft: `border-l-${accentColor}`,
    background: `bg-${accentColor}`,
    border: `border-${accentColor}`,
  };
};
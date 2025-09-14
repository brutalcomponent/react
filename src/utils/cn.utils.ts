/**
 * @file src/utils/cn.utils.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Universal classname utilities for all brutal components
 */
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// All brutal colors
export const brutalColors = [
  "brutal-pink",
  "brutal-peach",
  "brutal-yellow",
  "brutal-mint",
  "brutal-sky",
  "brutal-lavender",
  "brutal-coral",
] as const;

export type BrutalColor = (typeof brutalColors)[number];

// Static class mappings for all color variants
export const brutalAccentClasses = {
  "brutal-pink": {
    text: "text-brutal-pink",
    bg: "bg-brutal-pink",
    border: "border-brutal-pink",
    borderLeft: "border-l-brutal-pink",
    borderRight: "border-r-brutal-pink",
    borderTop: "border-t-brutal-pink",
    borderBottom: "border-b-brutal-pink",
    ring: "ring-brutal-pink",
  },
  "brutal-peach": {
    text: "text-brutal-peach",
    bg: "bg-brutal-peach",
    border: "border-brutal-peach",
    borderLeft: "border-l-brutal-peach",
    borderRight: "border-r-brutal-peach",
    borderTop: "border-t-brutal-peach",
    borderBottom: "border-b-brutal-peach",
    ring: "ring-brutal-peach",
  },
  "brutal-yellow": {
    text: "text-brutal-yellow",
    bg: "bg-brutal-yellow",
    border: "border-brutal-yellow",
    borderLeft: "border-l-brutal-yellow",
    borderRight: "border-r-brutal-yellow",
    borderTop: "border-t-brutal-yellow",
    borderBottom: "border-b-brutal-yellow",
    ring: "ring-brutal-yellow",
  },
  "brutal-mint": {
    text: "text-brutal-mint",
    bg: "bg-brutal-mint",
    border: "border-brutal-mint",
    borderLeft: "border-l-brutal-mint",
    borderRight: "border-r-brutal-mint",
    borderTop: "border-t-brutal-mint",
    borderBottom: "border-b-brutal-mint",
    ring: "ring-brutal-mint",
  },
  "brutal-sky": {
    text: "text-brutal-sky",
    bg: "bg-brutal-sky",
    border: "border-brutal-sky",
    borderLeft: "border-l-brutal-sky",
    borderRight: "border-r-brutal-sky",
    borderTop: "border-t-brutal-sky",
    borderBottom: "border-b-brutal-sky",
    ring: "ring-brutal-sky",
  },
  "brutal-lavender": {
    text: "text-brutal-lavender",
    bg: "bg-brutal-lavender",
    border: "border-brutal-lavender",
    borderLeft: "border-l-brutal-lavender",
    borderRight: "border-r-brutal-lavender",
    borderTop: "border-t-brutal-lavender",
    borderBottom: "border-b-brutal-lavender",
    ring: "ring-brutal-lavender",
  },
  "brutal-coral": {
    text: "text-brutal-coral",
    bg: "bg-brutal-coral",
    border: "border-brutal-coral",
    borderLeft: "border-l-brutal-coral",
    borderRight: "border-r-brutal-coral",
    borderTop: "border-t-brutal-coral",
    borderBottom: "border-b-brutal-coral",
    ring: "ring-brutal-coral",
  },
} as const;

// Main utility - works for ANY component
export const getAccentClasses = (accentColor: string = "brutal-pink") => {
  // Normalize the color name
  const normalizedColor = accentColor.startsWith("brutal-")
    ? accentColor
    : `brutal-${accentColor}`;

  return (
    brutalAccentClasses[normalizedColor as keyof typeof brutalAccentClasses] ||
    brutalAccentClasses["brutal-pink"]
  ); // fallback
};

// Get a specific accent class variant
export const getAccentClass = (
  accentColor: string,
  variant: keyof (typeof brutalAccentClasses)["brutal-pink"],
) => {
  const classes = getAccentClasses(accentColor);
  return classes[variant];
};

// Universal brutal base classes for any component
export const brutalBase = {
  // Core styling
  surface: "bg-brutal-white",
  border: "border-4 border-brutal-black",
  shadow: "shadow-brutal",

  // Interactive states
  hover: "hover:shadow-brutal-md hover:-translate-y-0.5",
  active: "active:shadow-brutal-sm active:translate-y-0.5",
  focus: "focus:outline-none focus:shadow-brutal-lg",

  // Transforms
  skew: "transform -rotate-1 hover:rotate-0",
  skewReverse: "transform rotate-1 hover:rotate-0",

  // Typography
  heading: "font-black uppercase tracking-wider",
  body: "font-mono leading-relaxed",
  accent: "font-black",

  // Transitions
  transition: "transition-all duration-300",
  transitionFast: "transition-all duration-200",

  // Spacing
  padding: "p-6",
  paddingSm: "p-3",
  paddingLg: "p-8",
} as const;

// Size variants that work across all components
export const brutalSizes = {
  xs: {
    padding: "px-2 py-1",
    text: "text-xs",
    border: "border-2",
    shadow: "shadow-brutal-sm",
  },
  sm: {
    padding: "px-3 py-2",
    text: "text-sm",
    border: "border-3",
    shadow: "shadow-brutal-sm",
  },
  md: {
    padding: "px-4 py-3",
    text: "text-base",
    border: "border-4",
    shadow: "shadow-brutal",
  },
  lg: {
    padding: "px-6 py-4",
    text: "text-lg",
    border: "border-4",
    shadow: "shadow-brutal-md",
  },
  xl: {
    padding: "px-8 py-6",
    text: "text-xl",
    border: "border-4",
    shadow: "shadow-brutal-lg",
  },
} as const;

export type BrutalSize = keyof typeof brutalSizes;

export const getSizeClasses = (size: BrutalSize = "md") => {
  return brutalSizes[size];
};

// Universal brutal variants
export const brutalVariants = {
  // Surface variants
  flat: "bg-brutal-white",
  raised: "bg-brutal-white shadow-brutal",
  sunken: "bg-brutal-gray-100",
  bordered: "bg-brutal-white border-4 border-brutal-black",

  // State variants
  default: "bg-brutal-white text-brutal-black",
  primary: "bg-brutal-black text-brutal-white",
  secondary: "bg-brutal-gray-100 text-brutal-black",
  ghost: "bg-transparent text-brutal-black border-4 border-brutal-black",
  danger: "bg-brutal-coral text-brutal-black",
  success: "bg-brutal-mint text-brutal-black",
  warning: "bg-brutal-yellow text-brutal-black",
  info: "bg-brutal-sky text-brutal-black",
} as const;

export type BrutalVariant = keyof typeof brutalVariants;

export const getVariantClasses = (variant: BrutalVariant = "default") => {
  return brutalVariants[variant];
};

// Universal brutal component builder
export const createBrutalClasses = (
  options: {
    accent?: string;
    size?: BrutalSize;
    variant?: BrutalVariant;
    brutal?: boolean;
    hover?: boolean;
    skew?: boolean;
    padding?: boolean;
    border?: boolean;
    shadow?: boolean;
    transition?: boolean;
  } = {},
) => {
  const {
    accent = "brutal-pink",
    size = "md",
    variant = "default",
    brutal = true,
    hover = true,
    skew = false,
    padding = true,
    border = true,
    shadow = true,
    transition = true,
  } = options;

  const accentClasses = getAccentClasses(accent);
  const sizeClasses = getSizeClasses(size);
  const variantClasses = getVariantClasses(variant);

  return cn(
    // Base variant
    variantClasses,

    // Size
    padding && sizeClasses.padding,
    sizeClasses.text,

    // Brutal styling
    brutal && [
      border && [sizeClasses.border, "border-brutal-black"],
      shadow && sizeClasses.shadow,
      skew && brutalBase.skew,
    ],

    // Interactive states
    hover && brutal && brutalBase.hover,

    // Transitions
    transition && brutalBase.transition,
  );
};

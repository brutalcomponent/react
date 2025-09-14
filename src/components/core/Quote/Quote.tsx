/**
 * @file src/components/core/Quote/Quote.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal quote/blockquote component with multiple variants and styling options
 */
import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Icon } from "../Icon";
import {
  cn,
  getSizeClasses,
  getAccentClasses,
  brutalBase,
} from "../../../utils/cn.utils";
import type { QuoteProps } from "./types";

/**
 * @component Quote
 * @description Brutal blockquote component with author attribution and multiple variants
 */
export const Quote: React.FC<QuoteProps> = ({
  children,
  author,
  source,
  variant = "default",
  size = "md",
  brutal = true,
  animated = true,
  showQuoteMarks = true,
  accentColor = "brutal-pink",
  className,
}) => {
  const sizeClasses = getSizeClasses(size);
  const accentClasses = getAccentClasses(accentColor);

  const getVariantClasses = () => {
    switch (variant) {
      case "large":
        return {
          container: cn(
            "p-8",
            size === "lg" ? "p-10" : size === "xs" ? "p-4" : "p-8",
          ),
          text: cn("text-2xl md:text-3xl", size === "lg" ? "lg:text-4xl" : ""),
          cite: "text-base",
        };

      case "testimonial":
        return {
          container: cn(
            "p-8 text-center",
            size === "lg" ? "p-12" : size === "xs" ? "p-6" : "p-8",
          ),
          text: cn("text-xl md:text-2xl", size === "lg" ? "lg:text-3xl" : ""),
          cite: "text-sm",
        };

      case "minimal":
        return {
          container: cn(
            "p-4",
            size === "lg" ? "p-6" : size === "xs" ? "p-3" : "p-4",
          ),
          text: sizeClasses.text,
          cite: "text-xs",
        };

      case "card":
        return {
          container: cn(
            "p-6",
            size === "lg" ? "p-8" : size === "xs" ? "p-4" : "p-6",
          ),
          text: cn(
            "text-lg",
            size === "lg" ? "text-xl" : size === "xs" ? "text-base" : "text-lg",
          ),
          cite: "text-sm",
        };

      default:
        return {
          container: cn(
            "p-6",
            size === "lg" ? "p-8" : size === "xs" ? "p-4" : "p-6",
          ),
          text: cn(
            "text-lg",
            size === "lg" ? "text-xl" : size === "xs" ? "text-base" : "text-lg",
          ),
          cite: "text-sm",
        };
    }
  };

  const styles = getVariantClasses();

  return (
    <blockquote
      className={cn(
        // Base styling
        "relative overflow-hidden",
        styles.container,

        // Background and borders
        variant === "minimal" ? "bg-transparent" : "bg-brutal-gray-100",

        // Brutal styling
        brutal && [
          variant !== "minimal" && "border-l-4 border-accent shadow-brutal",
          variant === "card" && "border-4 border-brutal-black",
          animated && [
            "hover:shadow-brutal-md transition-all duration-300",
            "transform hover:rotate-0 hover:-translate-y-1",
            variant !== "testimonial" && "-rotate-1",
          ],
        ],
        !brutal && [
          variant !== "minimal" &&
            "border-l-4 border-accent rounded-lg shadow-lg",
          animated &&
            "hover:shadow-xl hover:scale-105 transition-all duration-300",
        ],

        // Variant specific styling
        variant === "testimonial" && "mx-auto max-w-4xl",
        variant === "minimal" && "border-l-2 border-accent pl-4",

        className,
      )}
      style={
        {
          "--accent-color": accentColor.startsWith("#")
            ? accentColor
            : `var(--brutal-${accentColor.replace("brutal-", "")})`,
        } as React.CSSProperties
      }
    >
      {/* Opening quote mark */}
      {showQuoteMarks && variant !== "minimal" && (
        <Icon
          icon={FaQuoteLeft}
          size={size === "xs" ? "md" : size === "lg" ? "xl" : "lg"}
          className={cn(
            "absolute opacity-20 text-accent",
            variant === "testimonial"
              ? "top-6 left-1/2 -translate-x-1/2"
              : "top-4 left-4",
            animated && "transition-all duration-300 hover:opacity-30",
          )}
        />
      )}

      {/* Quote text */}
      <p
        className={cn(
          // Base text styling
          styles.text,
          "font-mono leading-relaxed text-brutal-gray-700 relative z-10",

          // Variant specific text styling
          variant === "testimonial" && "mx-auto max-w-3xl",
          variant === "large" && "font-black",
          variant === "minimal" && "font-normal",

          // Spacing for quote marks
          showQuoteMarks && variant !== "minimal" && "mt-8",
        )}
      >
        {children}
      </p>

      {/* Closing quote mark */}
      {showQuoteMarks && (variant === "testimonial" || variant === "large") && (
        <Icon
          icon={FaQuoteRight}
          size={size === "xs" ? "md" : size === "lg" ? "xl" : "lg"}
          className={cn(
            "absolute opacity-20 text-accent",
            variant === "testimonial"
              ? "bottom-6 right-1/2 translate-x-1/2"
              : "bottom-4 right-4",
            animated && "transition-all duration-300 hover:opacity-30",
          )}
        />
      )}

      {/* Citation */}
      {(author || source) && (
        <cite
          className={cn(
            // Base citation styling
            "block mt-4 not-italic font-bold uppercase tracking-wider",
            styles.cite,
            "text-brutal-gray-600",

            // Variant specific citation styling
            variant === "testimonial" && "text-center",
            variant === "minimal" && "font-normal normal-case tracking-normal",

            // Spacing adjustments
            showQuoteMarks && variant !== "minimal" && "mt-6",
          )}
        >
          {author && <span className="text-accent font-black">— {author}</span>}
          {author && source && (
            <span className="text-brutal-gray-500 mx-2">•</span>
          )}
          {source && (
            <span className="font-normal italic text-brutal-gray-500">
              {source}
            </span>
          )}
        </cite>
      )}

      {/* Decorative corner element for brutal styling */}
      {brutal && animated && variant === "card" && (
        <div className="absolute top-0 right-0 w-6 h-6 bg-accent opacity-20 -mr-3 -mt-3 rotate-45" />
      )}
    </blockquote>
  );
};

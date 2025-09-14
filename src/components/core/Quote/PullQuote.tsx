/**
 * @file src/components/core/Quote/PullQuote.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Large pull quote component for articles and editorial content
 */
import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Icon } from "../Icon";
import { cn, getSizeClasses, getAccentClasses } from "../../../utils/cn.utils";
import type { PullQuoteProps } from "./types";

/**
 * @component PullQuote
 * @description Large, attention-grabbing quote for breaking up long content
 */
export const PullQuote: React.FC<PullQuoteProps> = ({
  children,
  author,
  variant = "default",
  size = "lg",
  brutal = true,
  animated = true,
  showQuoteMarks = true,
  accentColor = "brutal-pink",
  className,
}) => {
  const sizeClasses = getSizeClasses(size);

  const getVariantClasses = () => {
    switch (variant) {
      case "centered":
        return {
          container: "text-center py-12 px-8",
          text: "text-3xl md:text-4xl lg:text-5xl max-w-4xl mx-auto",
        };

      case "offset":
        return {
          container: "py-8 px-6 ml-8 md:ml-16",
          text: "text-2xl md:text-3xl lg:text-4xl",
        };

      case "full-width":
        return {
          container: "py-16 px-4 text-center bg-accent/5",
          text: "text-4xl md:text-5xl lg:text-6xl max-w-6xl mx-auto",
        };

      default:
        return {
          container: "py-8 px-6",
          text: "text-2xl md:text-3xl lg:text-4xl",
        };
    }
  };

  const styles = getVariantClasses();

  return (
    <aside
      className={cn(
        // Base styling
        "my-8 relative overflow-hidden",
        styles.container,

        // Brutal styling
        brutal && [
          variant !== "full-width" && "border-t-4 border-b-4 border-accent",
          variant === "full-width" && "border-y-8 border-accent",
          animated && [
            "transition-all duration-500 hover:scale-105",
            "transform hover:-skew-x-1",
          ],
        ],
        !brutal && [
          "border-l-4 border-accent rounded-lg bg-brutal-gray-50",
          animated && "hover:shadow-lg transition-all duration-300",
        ],

        // Variant specific styling
        variant === "full-width" && "mx-[-2rem] md:mx-[-4rem]",
        variant === "offset" && "border-l-8 border-accent",

        className,
      )}
      style={
        {
          "--accent-color": accentColor.startsWith("#")
            ? accentColor
            : `var(--brutal-${accentColor.replace("brutal-", "")})`,
        } as React.CSSProperties
      }
      role="complementary"
      aria-label="Pull quote"
    >
      {/* Opening quote mark */}
      {showQuoteMarks && (
        <Icon
          icon={FaQuoteLeft}
          size="2xl"
          className={cn(
            "absolute opacity-10 text-accent",
            variant === "centered" || variant === "full-width"
              ? "top-4 left-1/2 -translate-x-1/2"
              : "top-2 left-2",
            animated && "transition-all duration-300 hover:opacity-20",
          )}
        />
      )}

      {/* Pull quote text */}
      <p
        className={cn(
          // Base text styling
          styles.text,
          "font-black text-brutal-black uppercase tracking-wider leading-tight",
          "relative z-10",

          // Transform effects
          brutal &&
            animated && [
              "transform transition-transform duration-300",
              variant !== "centered" &&
                variant !== "full-width" &&
                "-skew-x-2 hover:skew-x-0",
            ],

          // Spacing for quote marks
          showQuoteMarks && "mt-8 mb-8",
        )}
      >
        {children}
      </p>

      {/* Closing quote mark */}
      {showQuoteMarks && (
        <Icon
          icon={FaQuoteRight}
          size="2xl"
          className={cn(
            "absolute opacity-10 text-accent",
            variant === "centered" || variant === "full-width"
              ? "bottom-4 right-1/2 translate-x-1/2"
              : "bottom-2 right-2",
            animated && "transition-all duration-300 hover:opacity-20",
          )}
        />
      )}

      {/* Author attribution */}
      {author && (
        <cite
          className={cn(
            "block mt-4 not-italic font-bold uppercase tracking-widest text-brutal-gray-600",
            variant === "centered" || variant === "full-width"
              ? "text-center"
              : "text-right",
            size === "xs" ? "text-xs" : "text-sm",
          )}
        >
          — {author}
        </cite>
      )}

      {/* Decorative elements for brutal styling */}
      {brutal && animated && (
        <>
          <div className="absolute top-0 left-0 w-4 h-4 bg-accent opacity-30 -ml-2 -mt-2 rotate-45" />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-accent opacity-30 -mr-2 -mb-2 rotate-45" />
        </>
      )}
    </aside>
  );
};

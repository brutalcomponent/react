/**
 * @file src/components/core/Quote/Quote.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal quote/blockquote component
 */
import React from "react";
import { clsx } from "clsx";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Icon } from "../Icon/Icon";
import type { QuoteProps } from "./types";

export const Quote: React.FC<QuoteProps> = ({
  children,
  author,
  source,
  variant = "default",
  brutal = true,
  className,
}) => {
  const variantClasses = {
    default: {
      container: "p-6",
      text: "text-lg",
      cite: "text-sm",
    },
    large: {
      container: "p-8",
      text: "text-2xl md:text-3xl",
      cite: "text-base",
    },
    testimonial: {
      container: "p-8 text-center",
      text: "text-xl md:text-2xl",
      cite: "text-sm",
    },
  };

  const styles = variantClasses[variant];

  return (
    <blockquote
      className={clsx(
        "relative",
        styles.container,
        "bg-brutal-gray-100",
        brutal && "border-l-4 border-brutal-pink",
        brutal && "shadow-brutal hover:shadow-brutal-md",
        "transition-all duration-200",
        brutal && "hover:-rotate-1",
        className,
      )}
    >
      {/* Opening quote */}
      <Icon
        icon={FaQuoteLeft}
        size="lg"
        className="absolute top-4 left-4 text-brutal-pink opacity-20"
      />

      {/* Quote text */}
      <p
        className={clsx(
          styles.text,
          "font-mono leading-relaxed text-brutal-gray-700",
          "relative z-10",
          variant === "testimonial" && "mx-auto max-w-3xl",
        )}
      >
        {children}
      </p>

      {/* Closing quote */}
      {variant === "testimonial" && (
        <Icon
          icon={FaQuoteRight}
          size="lg"
          className="absolute bottom-4 right-4 text-brutal-pink opacity-20"
        />
      )}

      {/* Citation */}
      {(author || source) && (
        <cite
          className={clsx(
            "block mt-4 not-italic",
            styles.cite,
            "text-brutal-gray-600",
            variant === "testimonial" && "text-center",
          )}
        >
          <span className="font-bold uppercase tracking-wider">
            {author && `— ${author}`}
            {author && source && ", "}
            {source && <span className="font-normal italic">{source}</span>}
          </span>
        </cite>
      )}
    </blockquote>
  );
};

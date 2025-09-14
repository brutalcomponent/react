/**
 * @file src/components/core/Link/Link.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal link component with comprehensive Next.js support and multiple variants
 */
import React from "react";
import { FaExternalLinkAlt, FaArrowRight, FaDownload } from "react-icons/fa";
import { Icon } from "../Icon";
import {
  cn,
  getSizeClasses,
  getAccentClasses,
  brutalBase,
} from "../../../utils/cn.utils";
import type { LinkProps } from "./types";

/**
 * @component Link
 * @description Brutal link component with Next.js support and multiple styling variants
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = "default",
      external = false,
      showExternalIcon = true,
      icon,
      iconPosition = "right",
      brutal = true,
      size = "md",
      animated = true,
      accentColor = "brutal-pink",
      className,
      children,
      href,
      as: Component,
      download,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = getSizeClasses(size);
    const accentClasses = getAccentClasses(accentColor);

    // Auto-detect external links
    const isExternal =
      external || (href && (href.startsWith("http") || href.startsWith("//")));

    // Auto-detect download links
    const isDownload =
      download !== undefined ||
      href?.includes("/download") ||
      href?.match(/\.(pdf|doc|docx|zip|rar)$/);

    const getVariantClasses = () => {
      switch (variant) {
        case "underline":
          return cn(
            // Base styling
            "font-bold transition-all duration-200 inline-block",
            "text-accent hover:text-brutal-black",
            "border-b-2 border-accent hover:border-brutal-black",

            // Brutal effects
            brutal &&
              animated && [
                "hover:transform hover:-skew-x-2 hover:-translate-y-0.5",
                "hover:shadow-brutal-sm",
              ],
          );

        case "button":
          return cn(
            // Base button styling
            "inline-flex items-center justify-center gap-2 font-black uppercase tracking-wider",
            "bg-accent text-brutal-black border-4 border-brutal-black",
            "transition-all duration-200",

            // Size classes
            sizeClasses.padding,
            sizeClasses.text,

            // Brutal effects
            brutal && [
              sizeClasses.shadow,
              "hover:shadow-brutal-md hover:-translate-x-0.5 hover:-translate-y-0.5",
              "active:shadow-brutal-sm active:translate-x-0 active:translate-y-0",
            ],
            !brutal && "rounded-md hover:scale-105",

            // Hover effects
            "hover:bg-brutal-black hover:text-accent",
          );

        case "nav":
          return cn(
            // Navigation styling
            "font-black uppercase tracking-wider transition-all duration-200",
            "text-brutal-black hover:text-accent",

            // Size classes
            sizeClasses.text,

            // Brutal effects
            brutal &&
              animated &&
              "hover:transform hover:-skew-x-3 hover:scale-105",

            // Focus styles
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          );

        case "ghost":
          return cn(
            // Ghost styling
            "font-bold transition-all duration-200",
            "text-brutal-gray-600 hover:text-accent",
            "hover:bg-accent/10 px-2 py-1 rounded",

            // Brutal effects
            brutal && animated && "hover:transform hover:-rotate-1",
          );

        case "brutal":
          return cn(
            // Extreme brutal styling
            "font-black uppercase tracking-wider transition-all duration-300",
            "text-accent hover:text-brutal-black",
            "transform -rotate-1 hover:rotate-0 hover:scale-110",
            "hover:drop-shadow-lg",

            // Size classes
            sizeClasses.text,
          );

        default:
          return cn(
            // Default link styling
            "font-bold transition-all duration-200",
            "text-accent hover:text-brutal-black",

            // Brutal effects
            brutal &&
              animated && [
                "hover:transform hover:-skew-x-1 hover:scale-105",
                "hover:drop-shadow-sm",
              ],

            // Focus styles
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 rounded-sm",
          );
      }
    };

    // Determine which icon to show
    const getIcon = () => {
      if (icon) return icon;
      if (isDownload) return FaDownload;
      if (isExternal && showExternalIcon) return FaExternalLinkAlt;
      if (variant === "button" && !icon) return FaArrowRight;
      return null;
    };

    const IconComponent = getIcon();
    const linkProps = isExternal
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

    const linkClassName = cn(
      // Base classes
      getVariantClasses(),

      // Icon spacing
      (IconComponent || variant === "button") &&
        "inline-flex items-center gap-2",

      // Disabled state
      props["aria-disabled"] && [
        "opacity-50 cursor-not-allowed pointer-events-none",
        "hover:transform-none hover:shadow-none",
      ],

      className,
    );

    const content = (
      <>
        {IconComponent && iconPosition === "left" && (
          <Icon
            icon={IconComponent}
            size={size === "xs" ? "xs" : size === "sm" ? "sm" : "md"}
            brutal={brutal && animated}
            accentColor={accentColor}
          />
        )}
        <span className={variant === "button" ? "select-none" : undefined}>
          {children}
        </span>
        {IconComponent && iconPosition === "right" && (
          <Icon
            icon={IconComponent}
            size={size === "xs" ? "xs" : size === "sm" ? "sm" : "md"}
            brutal={brutal && animated}
            accentColor={accentColor}
          />
        )}
      </>
    );

    // Next.js Link support
    if (Component) {
      return (
        <Component
          href={href}
          {...(isExternal ? {} : { passHref: true })}
          {...props}
        >
          <a
            ref={ref}
            className={linkClassName}
            style={
              {
                "--accent-color": accentColor.startsWith("#")
                  ? accentColor
                  : `var(--brutal-${accentColor.replace("brutal-", "")})`,
              } as React.CSSProperties
            }
            {...linkProps}
            download={download}
            aria-label={
              isExternal
                ? `${children} (opens in new tab)`
                : isDownload
                  ? `Download ${children}`
                  : undefined
            }
          >
            {content}
          </a>
        </Component>
      );
    }

    // Regular anchor tag
    return (
      <a
        ref={ref}
        href={href}
        className={linkClassName}
        style={
          {
            "--accent-color": accentColor.startsWith("#")
              ? accentColor
              : `var(--brutal-${accentColor.replace("brutal-", "")})`,
          } as React.CSSProperties
        }
        download={download}
        aria-label={
          isExternal
            ? `${children} (opens in new tab)`
            : isDownload
              ? `Download ${children}`
              : undefined
        }
        {...linkProps}
        {...props}
      >
        {content}
      </a>
    );
  },
);

Link.displayName = "Link";

/**
 * @component ExternalLink
 * @description Link component pre-configured for external links
 */
export const ExternalLink: React.FC<Omit<LinkProps, "external">> = (props) => (
  <Link {...props} external={true} />
);

/**
 * @component ButtonLink
 * @description Link component styled as a button
 */
export const ButtonLink: React.FC<Omit<LinkProps, "variant">> = (props) => (
  <Link {...props} variant="button" />
);

/**
 * @component BrutalLink
 * @description Link with extreme brutal styling
 */
export const BrutalLink: React.FC<Omit<LinkProps, "variant" | "brutal">> = (
  props,
) => <Link {...props} variant="brutal" brutal={true} />;

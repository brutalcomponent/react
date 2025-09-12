/**
 * @file src/components/core/Link/Link.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal link component with optional Next.js support
 */
import React from "react";
import { clsx } from "clsx";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Icon } from "../Icon/Icon";
import type { LinkProps } from "./types";

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = "default",
      external = false,
      showExternalIcon = true,
      icon,
      iconPosition = "right",
      brutal = true,
      className,
      children,
      href,
      as: Component,
      ...props
    },
    ref,
  ) => {
    const variantClasses = {
      default: clsx(
        "text-brutal-pink hover:text-brutal-peach",
        "font-bold transition-colors duration-200",
      ),
      underline: clsx(
        "text-brutal-pink hover:text-brutal-peach",
        "font-bold transition-all duration-200",
        "border-b-2 border-brutal-pink hover:border-brutal-peach",
      ),
      button: clsx(
        "inline-flex items-center gap-2",
        "px-4 py-2 font-bold uppercase tracking-wider",
        "bg-brutal-black text-brutal-white border-2 border-brutal-black",
        "hover:bg-brutal-gray-800 transition-all duration-200",
        brutal && "shadow-brutal hover:shadow-brutal-md",
        brutal && "hover:-translate-x-0.5 hover:-translate-y-0.5",
      ),
      nav: clsx(
        "text-brutal-black hover:text-brutal-pink",
        "font-bold uppercase tracking-wider transition-colors duration-200",
        "hover:transform hover:-skew-x-3",
      ),
    };

    const linkProps = external
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

    const showIcon = external && showExternalIcon && !icon;
    const IconComponent = icon || (showIcon ? FaExternalLinkAlt : null);

    const linkClassName = clsx(
      variantClasses[variant],
      (IconComponent || variant === "button") &&
        "inline-flex items-center gap-2",
      className,
    );

    const content = (
      <>
        {IconComponent && iconPosition === "left" && (
          <Icon icon={IconComponent} size="sm" />
        )}
        {children}
        {IconComponent && iconPosition === "right" && (
          <Icon icon={IconComponent} size="sm" />
        )}
      </>
    );

    // If a custom component is provided (like Next.js Link)
    if (Component) {
      return (
        <Component href={href} {...linkProps} {...props}>
          <a ref={ref} className={linkClassName}>
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
        {...linkProps}
        {...props}
      >
        {content}
      </a>
    );
  },
);

Link.displayName = "Link";

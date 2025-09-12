/**
 * @file src/components/navigation/Header/Header.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal header component with mobile responsiveness
 */
import React from "react";
import { clsx } from "clsx";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  brutal?: boolean;
  variant?: "default" | "inverted" | "transparent";
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      sticky = true,
      brutal = true,
      variant = "default",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <header
        ref={ref}
        className={clsx(
          // Base
          "w-full z-50 transition-all duration-300",
          sticky && "sticky top-0",

          // Variants
          variant === "default" && "bg-brutal-white",
          variant === "inverted" && "bg-brutal-black text-brutal-white",
          variant === "transparent" && "bg-transparent",

          // Brutal
          brutal && "border-b-4 border-brutal-black",
          brutal && variant === "default" && "shadow-brutal",

          className,
        )}
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {children}
          </div>
        </div>
      </header>
    );
  },
);

Header.displayName = "Header";

export const HeaderLogo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={clsx(
      "flex items-center gap-2 font-black text-xl sm:text-2xl uppercase tracking-wider",
      "transform hover:-rotate-1 transition-transform duration-200",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

/**
 * @component HeaderNav
 * @description Navigation section for header
 */
export const HeaderNav: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  children,
  ...props
}) => (
  <nav
    className={clsx("hidden md:flex items-center gap-6", className)}
    {...props}
  >
    {children}
  </nav>
);

/**
 * @component HeaderActions
 * @description Actions section for header
 */
export const HeaderActions: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={clsx("flex items-center gap-2 sm:gap-4", className)}
    {...props}
  >
    {children}
  </div>
);

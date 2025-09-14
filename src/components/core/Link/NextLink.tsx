/**
 * @file src/components/core/Link/NextLink.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Next.js specific link wrapper with enhanced routing support
 */
import React from "react";
import { Link } from "./Link";
import type { LinkProps } from "./types";

/**
 * @component NextLink
 * @description Link component specifically designed for Next.js applications
 *
 * Usage:
 * ```tsx
 * import NextLink from 'next/link';
 * import { NextLink as BrutalNextLink } from '@brutalcomponent/react';
 *
 * <BrutalNextLink NextComponent={NextLink} href="/about">
 *   About Us
 * </BrutalNextLink>
 * ```
 */
export interface NextLinkProps extends Omit<LinkProps, "as"> {
  NextComponent: React.ComponentType<any>;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  locale?: string;
}

export const NextLink: React.FC<NextLinkProps> = ({
  NextComponent,
  prefetch,
  replace,
  scroll,
  shallow,
  locale,
  ...props
}) => {
  // Create a wrapper component that passes Next.js specific props
  const NextWrapper: React.FC<{ href: string; children: React.ReactNode }> = ({
    href,
    children,
  }) => (
    <NextComponent
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
      passHref
    >
      {children}
    </NextComponent>
  );

  return <Link {...props} as={NextWrapper} />;
};

/**
 * @function createNextLink
 * @description Factory function to create a Link component bound to Next.js Link
 *
 * Usage:
 * ```tsx
 * import NextLink from 'next/link';
 * import { createNextLink } from '@brutalcomponent/react';
 *
 * const BrutalNextLink = createNextLink(NextLink);
 *
 * <BrutalNextLink href="/about">About Us</BrutalNextLink>
 * ```
 */
export const createNextLink = (NextComponent: React.ComponentType<any>) => {
  const BoundNextLink: React.FC<Omit<NextLinkProps, "NextComponent">> = (
    props,
  ) => <NextLink {...props} NextComponent={NextComponent} />;

  BoundNextLink.displayName = "BoundNextLink";
  return BoundNextLink;
};

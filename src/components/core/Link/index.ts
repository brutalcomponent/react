/**
 * @file src/components/core/Link/index.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Link components barrel export with Next.js support
 */
export { Link, ExternalLink, ButtonLink, NavLink, BrutalLink } from "./Link";
export { NextLink, createNextLink } from "./NextLink";
export { LinkSkeleton, LinkGroupSkeleton } from "./LinkSkeleton";

export type { LinkProps, NextLinkComponent } from "./types";
export type { LinkSkeletonProps, LinkGroupSkeletonProps } from "./LinkSkeleton";
export type { NextLinkProps } from "./NextLink";

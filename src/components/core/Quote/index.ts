/**
 * @file src/components/core/Quote/index.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Quote components barrel export
 */
export { Quote } from "./Quote";
export { PullQuote } from "./PullQuote";
export { QuoteSkeleton, PullQuoteSkeleton } from "./QuoteSkeleton";

export type { QuoteProps, PullQuoteProps } from "./types";
export type {
  QuoteSkeletonProps,
  PullQuoteSkeletonProps,
} from "./QuoteSkeleton";

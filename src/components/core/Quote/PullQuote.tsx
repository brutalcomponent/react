/**
 * @file src/components/core/Quote/PullQuote.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Large pull quote for articles
 */
import React from "react";
import { clsx } from "clsx";
import type { PullQuoteProps } from "./types";

export const PullQuote: React.FC<PullQuoteProps> = ({
  children,
  className,
}) => (
  <aside
    className={clsx(
      "my-8 py-6",
      "border-t-4 border-b-4 border-brutal-black",
      className,
    )}
  >
    <p className="text-2xl md:text-3xl font-black text-brutal-black text-center uppercase tracking-wider transform -skew-x-2">
      {children}
    </p>
  </aside>
);

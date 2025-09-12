/**
 * @file src/components/core/Tabs/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Type definitions for Tabs components
 */
export interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
}

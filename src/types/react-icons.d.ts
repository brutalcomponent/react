/**
 * @file src/types/react-icons.d.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Type definitions for React icons
 */
export type IconType = (props: {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
  attr?: React.SVGAttributes<SVGElement>;
  title?: string;
}) => JSX.Element;

/**
 * @file src/components/charts/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Type definitions for chart components
 */
export interface ChartDataPoint {
  name: string;
  value: number;
  label?: string;
  color?: string;
  [key: string]: any;
}

export interface BaseChartProps {
  data: ChartDataPoint[];
  height?: number;
  dataKey?: string;
  xDataKey?: string;
  color?: string;
  colors?: string[];
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  brutal?: boolean;
  className?: string;
  animate?: boolean;
}

export const brutalChartColors = [
  "#000000", // black
  "#FFD6E8", // pink
  "#D6FFE5", // mint
  "#D6EDFF", // sky
  "#E8D6FF", // lavender
  "#FFE5D6", // peach
  "#FFF3D6", // yellow
  "#FFD6D6", // coral
];

/**
 * @const chartStyles
 * @description Common chart styling
 */
export const chartStyles = {
  fontFamily: "JetBrains Mono, monospace",
  fontWeight: "bold",
};

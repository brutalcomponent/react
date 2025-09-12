/**
 * @file src/components/charts/SparklineChart.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Small inline sparkline chart component
 * @client This component requires client-side JavaScript
 */
"use client";

import React from "react";
import { clsx } from "clsx";

// Try to import Recharts
let Recharts: any;
try {
  Recharts = require("recharts");
} catch {
  // Recharts not installed
}

export interface SparklineChartProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

/**
 * @component SparklineChart
 * @description Small inline chart for metrics
 */
export const SparklineChart: React.FC<SparklineChartProps> = ({
  data,
  width = 100,
  height = 40,
  color = "#000000",
  className,
}) => {
  if (!Recharts) {
    return (
      <div
        className={clsx(
          "inline-block bg-brutal-gray-100 border-2 border-brutal-black",
          className,
        )}
        style={{ width, height }}
      />
    );
  }

  const chartData = data.map((value, index) => ({ value, index }));
  const { ResponsiveContainer, LineChart, Line } = Recharts;

  return (
    <div className={clsx("inline-block", className)} style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

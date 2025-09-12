/**
 * @file src/components/charts/AreaChart.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal area chart component using Recharts
 * @client This component requires client-side JavaScript
 */
"use client";

import React from "react";
import { clsx } from "clsx";
import type { BaseChartProps } from "./types";
import { chartStyles } from "./types";

// Try to import Recharts
let Recharts: any;
try {
  Recharts = require("recharts");
} catch {
  // Recharts not installed
}

export const AreaChart: React.FC<BaseChartProps> = ({
  data,
  height = 300,
  dataKey = "value",
  xDataKey = "name",
  color = "#000000",
  showGrid = true,
  showTooltip = true,
  brutal = true,
  className,
  animate = true,
}) => {
  if (!Recharts) {
    return (
      <div
        className={clsx(
          "flex items-center justify-center p-8",
          "border-4 border-brutal-black bg-brutal-gray-100",
          "text-brutal-gray-600 font-mono text-sm",
          className,
        )}
        style={{ height }}
      >
        <div className="text-center">
          <p className="font-bold uppercase mb-2">Area Chart</p>
          <p className="text-xs">Install recharts: npm install recharts</p>
        </div>
      </div>
    );
  }

  const {
    ResponsiveContainer,
    AreaChart: ReAreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } = Recharts;

  return (
    <div className={clsx("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ReAreaChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray={brutal ? "0" : "3 3"}
              stroke={brutal ? "#000" : "#E5E5E5"}
              strokeWidth={brutal ? 2 : 1}
            />
          )}
          <XAxis
            dataKey={xDataKey}
            stroke="#000"
            strokeWidth={brutal ? 2 : 1}
            style={brutal ? chartStyles : {}}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="#000"
            strokeWidth={brutal ? 2 : 1}
            style={brutal ? chartStyles : {}}
            tick={{ fontSize: 12 }}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: brutal ? "4px solid #000" : "1px solid #E5E5E5",
                borderRadius: 0,
                padding: "8px",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "12px",
                fontWeight: brutal ? "bold" : "normal",
                boxShadow: brutal ? "4px 4px 0px 0px rgba(0,0,0,1)" : "none",
              }}
            />
          )}
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={brutal ? 3 : 2}
            fill={color}
            fillOpacity={0.2}
            animationDuration={animate ? 1000 : 0}
          />
        </ReAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

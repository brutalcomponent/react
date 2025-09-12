/**
 * @file src/components/charts/PieChart.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal pie chart component using Recharts
 * @client This component requires client-side JavaScript
 */
"use client";

import React from "react";
import { clsx } from "clsx";
import type { BaseChartProps } from "./types";
import { brutalChartColors } from "./types";

// Try to import Recharts
let Recharts: any;
try {
  Recharts = require("recharts");
} catch {
  // Recharts not installed
}

export const PieChart: React.FC<BaseChartProps> = ({
  data,
  height = 300,
  dataKey = "value",
  colors = brutalChartColors,
  showTooltip = true,
  showLegend = true,
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
          <p className="font-bold uppercase mb-2">Pie Chart</p>
          <p className="text-xs">Install recharts: npm install recharts</p>
        </div>
      </div>
    );
  }

  const {
    ResponsiveContainer,
    PieChart: RePieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
  } = Recharts;

  return (
    <div className={clsx("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RePieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill={colors[0]}
            stroke={brutal ? "#000" : "none"}
            strokeWidth={brutal ? 2 : 0}
            animationDuration={animate ? 1000 : 0}
            label={({ name, percent }: { name: string; percent: number }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            labelStyle={{
              fontSize: "12px",
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: brutal ? "bold" : "normal",
              fill: "#000",
            }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
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
          {showLegend && (
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="square"
              wrapperStyle={{
                paddingTop: "20px",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "12px",
                fontWeight: brutal ? "bold" : "normal",
              }}
            />
          )}
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
};

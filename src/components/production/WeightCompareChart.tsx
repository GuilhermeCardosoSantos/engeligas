"use client";

import {
  Scale,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  COLORS,
  formatWeight,
  getWeightCompareData,
} from "./helpers";

import { ProductionSummary } from "./types";

import ProductionChartCard from "./ProductionChartCard";

type Props = {
  summary: ProductionSummary;
};

function TooltipContent({
  active,
  payload,
  label,
}: any) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <p className="mb-1 text-sm font-semibold text-gray-800 dark:text-white/90">
        {label}
      </p>

      <p className="text-xs text-gray-600 dark:text-gray-300">
        Peso:{" "}
        <strong>
          {formatWeight(payload[0].value)}
        </strong>
      </p>
    </div>
  );
}

export default function WeightCompareChart({
  summary,
}: Props) {
  const data =
    getWeightCompareData(summary);

  return (
    <ProductionChartCard
      title="Peso Produzido x A Produzir"
      description="Comparativo geral de peso por estágio."
      icon={<Scale className="h-5 w-5" />}
    >
      <div className="h-[280px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#344054"
              opacity={0.18}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#98a2b3",
                fontSize: 12,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#98a2b3",
                fontSize: 12,
              }}
            />

            <Tooltip
              content={<TooltipContent />}
            />

            <Bar
              dataKey="value"
              name="Peso"
              radius={[8, 8, 0, 0]}
              fill={COLORS.orange}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ProductionChartCard>
  );
}
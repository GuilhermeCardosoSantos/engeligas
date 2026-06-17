"use client";

import {
  Gauge,
} from "lucide-react";

import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

import {
  COLORS,
  formatPercent,
  getTotalFinalizados,
} from "./helpers";

import { ProductionSummary } from "./types";

import ProductionChartCard from "./ProductionChartCard";

type Props = {
  summary: ProductionSummary;
};

export default function DeadlineGaugeChart({
  summary,
}: Props) {
  const cumprimento = Math.min(
    Number(summary.cumprimento_prazo ?? 0),
    100
  );

  const totalFinalizados =
    getTotalFinalizados(summary);

  const data = [
    {
      name: "Cumprimento",
      value: cumprimento,
      fill: COLORS.green,
      type: "percent",
    },
  ];

  return (
    <ProductionChartCard
      title="Cumprimento de Prazo"
      description="Percentual de OS finalizadas sem atraso."
      icon={<Gauge className="h-5 w-5" />}
    >
      <div className="relative h-[280px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <RadialBarChart
            cx="50%"
            cy="58%"
            innerRadius="72%"
            outerRadius="100%"
            barSize={18}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              tick={false}
            />

            <RadialBar
              dataKey="value"
              cornerRadius={999}
              background={{
                fill: "#e5e7eb",
              }}
              fill={COLORS.green}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="absolute inset-x-0 top-[46%] text-center">
          <p className="text-4xl font-bold text-gray-800 dark:text-white/90">
            {formatPercent(cumprimento)}
          </p>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {totalFinalizados} OS finalizadas
          </p>
        </div>
      </div>
    </ProductionChartCard>
  );
}
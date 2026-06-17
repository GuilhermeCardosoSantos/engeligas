"use client";

import {
  BarChart3,
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
  getTopLigas,
} from "./helpers";

import { ProductionLigaRow } from "./types";

import ProductionChartCard from "./ProductionChartCard";

type Props = {
  ligas: ProductionLigaRow[];
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
      <p className="mb-2 text-sm font-semibold text-gray-800 dark:text-white/90">
        {label}
      </p>

      <div className="space-y-1">
        {payload.map((item: any) => (
          <p
            key={item.dataKey}
            className="text-xs text-gray-600 dark:text-gray-300"
          >
            <span
              className="mr-2 inline-block h-2.5 w-2.5 rounded-full"
              style={{
                background: item.color,
              }}
            />

            {item.name}:{" "}
            <strong>
              {formatWeight(item.value)}
            </strong>
          </p>
        ))}
      </div>
    </div>
  );
}

function EmptyChart() {
  return (
    <div className="flex h-[360px] items-center justify-center rounded-2xl border border-dashed border-gray-300 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
      Nenhum dado para exibir.
    </div>
  );
}

export default function LigaWeightBarChart({
  ligas,
}: Props) {
  const data = getTopLigas(ligas);

  return (
    <ProductionChartCard
      title="Top Ligas por Peso"
      description="Peso produzido e a produzir por liga."
      icon={<BarChart3 className="h-5 w-5" />}
    >
      {data.length === 0 ? (
        <EmptyChart />
      ) : (
        <div className="h-[360px]">
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
                dataKey="liga"
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
                dataKey="produzido"
                name="Produzido"
                radius={[8, 8, 0, 0]}
                fill={COLORS.green}
              />

              <Bar
                dataKey="a_produzir"
                name="A produzir"
                radius={[8, 8, 0, 0]}
                fill={COLORS.orange}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </ProductionChartCard>
  );
}
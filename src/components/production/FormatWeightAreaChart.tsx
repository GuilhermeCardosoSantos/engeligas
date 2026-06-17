"use client";

import {
  Package,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  COLORS,
  formatWeight,
  getFormatoData,
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

function EmptyChart() {
  return (
    <div className="flex h-[360px] items-center justify-center rounded-2xl border border-dashed border-gray-300 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
      Nenhum dado para exibir.
    </div>
  );
}

export default function FormatWeightAreaChart({
  ligas,
}: Props) {
  const data = getFormatoData(ligas);

  return (
    <ProductionChartCard
      title="Peso por Formato"
      description="Distribuição do peso por tipo de item."
      icon={<Package className="h-5 w-5" />}
    >
      {data.length === 0 ? (
        <EmptyChart />
      ) : (
        <div className="h-[360px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="formatGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={COLORS.blue}
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="95%"
                    stopColor={COLORS.blue}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

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

              <Area
                type="monotone"
                dataKey="value"
                name="Peso"
                stroke={COLORS.blue}
                strokeWidth={3}
                fill="url(#formatGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </ProductionChartCard>
  );
}
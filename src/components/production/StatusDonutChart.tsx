"use client";

import {
  PieChartIcon,
} from "lucide-react";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  getStatusData,
  PIE_COLORS,
} from "./helpers";

import { ProductionSummary } from "./types";

import ProductionChartCard from "./ProductionChartCard";
import {
  formatNumber,
} from "./helpers";

type Props = {
  summary: ProductionSummary;
};

function TooltipContent({
  active,
  payload,
}: any) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {payload.map((item: any) => (
        <p
          key={item.name}
          className="text-xs text-gray-600 dark:text-gray-300"
        >
          <span
            className="mr-2 inline-block h-2.5 w-2.5 rounded-full"
            style={{
              background: item.payload.color,
            }}
          />

          {item.payload.name}:{" "}
          <strong>
            {formatNumber(item.payload.value)}
          </strong>
        </p>
      ))}
    </div>
  );
}

function EmptyChart() {
  return (
    <div className="flex h-[280px] items-center justify-center rounded-2xl border border-dashed border-gray-300 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
      Nenhum dado para exibir.
    </div>
  );
}

export default function StatusDonutChart({
  summary,
}: Props) {
  const data = getStatusData(summary);

  return (
    <ProductionChartCard
      title="Status da Produção"
      description="Distribuição atual das OS por situação."
      icon={
        <PieChartIcon className="h-5 w-5" />
      }
    >
      {data.length === 0 ? (
        <EmptyChart />
      ) : (
        <div className="h-[280px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Tooltip
                content={<TooltipContent />}
              />

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={72}
                outerRadius={105}
                paddingAngle={4}
              >
                {data.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={
                      item.color ??
                      PIE_COLORS[index]
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </ProductionChartCard>
  );
}
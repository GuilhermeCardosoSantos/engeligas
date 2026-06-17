"use client";

import { ProductionLigaRow, ProductionSummary } from "./types";

import DeadlineGaugeChart from "./DeadlineGaugeChart";
import StatusDonutChart from "./StatusDonutChart";
import WeightCompareChart from "./WeightCompareChart";
import LigaWeightBarChart from "./LigaWeightBarChart";
import FormatWeightAreaChart from "./FormatWeightAreaChart";

type Props = {
  summary: ProductionSummary;
  ligas: ProductionLigaRow[];
};

export default function ProductionCharts({
  summary,
  ligas,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <div className="xl:col-span-4">
        <DeadlineGaugeChart
          summary={summary}
        />
      </div>

      <div className="xl:col-span-4">
        <StatusDonutChart
          summary={summary}
        />
      </div>

      <div className="xl:col-span-4">
        <WeightCompareChart
          summary={summary}
        />
      </div>

      <div className="xl:col-span-8">
        <LigaWeightBarChart
          ligas={ligas}
        />
      </div>

      <div className="xl:col-span-4">
        <FormatWeightAreaChart
          ligas={ligas}
        />
      </div>
    </div>
  );
}
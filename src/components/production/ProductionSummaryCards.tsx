    "use client";

import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  ClipboardList,
  Package,
  Scale,
  XCircle,
} from "lucide-react";

import {
  formatPercent,
  formatWeight,
} from "./helpers";

import { ProductionSummary } from "./types";

import ProductionMetricCard from "./ProductionMetricCard";

type Props = {
  summary: ProductionSummary;
};

export default function ProductionSummaryCards({
  summary,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <ProductionMetricCard
        title="Total de Itens"
        value={summary.total_itens}
        icon={
          <ClipboardList className="h-5 w-5" />
        }
        tone="blue"
      />

      <ProductionMetricCard
        title="Itens em Aberto"
        value={summary.itens_em_aberto}
        icon={<Clock3 className="h-5 w-5" />}
        tone="blue"
      />

      <ProductionMetricCard
        title="Pedidos em Alerta"
        value={summary.pedidos_alerta}
        icon={
          <AlertTriangle className="h-5 w-5" />
        }
        tone="yellow"
      />

      <ProductionMetricCard
        title="Pedidos em Atraso"
        value={summary.pedidos_atraso}
        icon={<XCircle className="h-5 w-5" />}
        tone="red"
      />

      <ProductionMetricCard
        title="Finalizados no Prazo"
        value={summary.finalizados_no_prazo}
        icon={
          <CheckCircle2 className="h-5 w-5" />
        }
        tone="green"
      />

      <ProductionMetricCard
        title="Finalizados Antecipados"
        value={
          summary.finalizados_antecipados
        }
        icon={
          <CheckCircle2 className="h-5 w-5" />
        }
        tone="green"
      />

      <ProductionMetricCard
        title="Cancelados"
        value={summary.cancelados}
        icon={<XCircle className="h-5 w-5" />}
        tone="red"
      />

      <ProductionMetricCard
        title="Cumprimento de Prazo"
        value={formatPercent(
          summary.cumprimento_prazo
        )}
        subtitle="OS finalizadas sem atraso"
        icon={<BarChart3 className="h-5 w-5" />}
        tone="green"
      />

      <ProductionMetricCard
        title="Peso em Produção"
        value={formatWeight(
          summary.peso_em_producao
        )}
        icon={<Scale className="h-5 w-5" />}
        tone="orange"
      />

      <ProductionMetricCard
        title="Peso Produzido"
        value={formatWeight(
          summary.peso_produzido
        )}
        icon={<Scale className="h-5 w-5" />}
        tone="green"
      />

      <ProductionMetricCard
        title="Pedidos"
        value={summary.pedidos}
        icon={<Package className="h-5 w-5" />}
        tone="blue"
      />

      <ProductionMetricCard
        title="Finalizados em Atraso"
        value={summary.finalizados_em_atraso}
        icon={
          <AlertTriangle className="h-5 w-5" />
        }
        tone="red"
      />
    </div>
  );
}
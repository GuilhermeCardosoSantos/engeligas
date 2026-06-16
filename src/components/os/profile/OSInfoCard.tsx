"use client";

import {
  Boxes,
  CircleDollarSign,
  Package,
  Ruler,
  Scale,
} from "lucide-react";

import { OSProfileProps } from "./types";

import {
  formatCurrency,
  formatMedidas,
  formatNumber,
  formatText,
  formatWeight,
  getLigaClassBadge,
  getStatusClassBadge,
} from "./helpers";

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <div className="mt-2 text-sm font-semibold text-gray-800 dark:text-white/90">
        {value}
      </div>
    </div>
  );
}

export default function OSInfoCard({ os }: OSProfileProps) {
  const status = os.status ?? "EM ABERTO";

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-engeligas-500/10 text-engeligas-500">
          <Boxes className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Informações da OS
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Dados técnicos do produto vinculado à ordem de serviço.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <InfoItem
          label="Item"
          value={
            <span className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-400" />
              {formatText(os.item)}
            </span>
          }
        />

        <InfoItem
          label="Liga"
          value={
            <span
              className={`
                inline-flex
                w-fit
                rounded-full
                px-2.5
                py-1
                text-xs
                font-medium
                ${getLigaClassBadge(os.liga)}
              `}
            >
              {os.liga ?? "NÃO ENCONTRADO"}
            </span>
          }
        />

        <InfoItem
          label="Status"
          value={
            <span
              className={`
                inline-flex
                w-fit
                rounded-full
                px-2.5
                py-1
                text-xs
                font-medium
                ${getStatusClassBadge(status)}
              `}
            >
              {status}
            </span>
          }
        />

        <InfoItem
          label="Quantidade"
          value={`${formatNumber(os.quantidade)} ${os.unidade ?? ""}`}
        />

        <InfoItem
          label="Sobre Metal"
          value={formatNumber(os.sobre_metal)}
        />

        <InfoItem
          label="Medidas"
          value={
            <span className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-gray-400" />
              {formatMedidas(os.medidas)}
            </span>
          }
        />

        <InfoItem
          label="Peso Unitário"
          value={
            <span className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-gray-400" />
              {formatWeight(os.peso_unitario)}
            </span>
          }
        />

        <InfoItem
          label="Peso Total"
          value={
            <span className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-gray-400" />
              {formatWeight(os.peso_total)}
            </span>
          }
        />

        <InfoItem
          label="Valor Total"
          value={
            <span className="flex items-center gap-2 text-engeligas-500">
              <CircleDollarSign className="h-4 w-4" />
              {formatCurrency(os.valor_total)}
            </span>
          }
        />
      </div>
    </div>
  );
}
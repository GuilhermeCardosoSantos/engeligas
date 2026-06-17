"use client";

import {
  RefreshCcw,
} from "lucide-react";

import Button from "@/components/ui/button/Button";

type Props = {
  dataInicial: string;
  setDataInicial: React.Dispatch<
    React.SetStateAction<string>
  >;
  dataFinal: string;
  setDataFinal: React.Dispatch<
    React.SetStateAction<string>
  >;
  onRefresh: () => void;
  isFetching: boolean;
};

export default function ProductionFilters({
  dataInicial,
  setDataInicial,
  dataFinal,
  setDataFinal,
  onRefresh,
  isFetching,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            Painel de Produção
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Acompanhe produção, prazos, pesos e distribuição por liga.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Data Inicial
            </label>

            <input
              type="date"
              value={dataInicial}
              onChange={(e) =>
                setDataInicial(e.target.value)
              }
              className="h-11 rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Data Final
            </label>

            <input
              type="date"
              value={dataFinal}
              onChange={(e) =>
                setDataFinal(e.target.value)
              }
              className="h-11 rounded-xl border border-gray-300 bg-transparent px-4 text-sm outline-none transition focus:border-engeligas-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <Button
            variant="outline"
            onClick={onRefresh}
            disabled={isFetching}
          >
            <RefreshCcw className="h-4 w-4" />
            {isFetching
              ? "Atualizando..."
              : "Atualizar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
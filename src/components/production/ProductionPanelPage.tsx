"use client";

import * as React from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import { useGetProductionPanel } from "@/hooks/order/useGetProductionPanel";

import {
  emptySummary,
  getMonthEnd,
  getMonthStart,
} from "./helpers";

import { ProductionLigaRow, ProductionSummary } from "./types";

import ProductionFilters from "./ProductionFilters";
import ProductionSummaryCards from "./ProductionSummaryCards";
import ProductionCharts from "./ProductionCharts";
import ProductionTable from "./ProductionTable";

export default function ProductionPanelPage() {
  const [dataInicial, setDataInicial] =
    React.useState(getMonthStart());

  const [dataFinal, setDataFinal] =
    React.useState(getMonthEnd());

  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetProductionPanel(
    dataInicial,
    dataFinal
  );

  const summary: ProductionSummary =
    data?.summary ?? emptySummary;

  const ligas: ProductionLigaRow[] =
    data?.ligas ?? [];

  return (
    <div className="space-y-6">
      <PageBreadcrumb
        pageTitle="Painel de Produção"
      />

      <ProductionFilters
        dataInicial={dataInicial}
        setDataInicial={setDataInicial}
        dataFinal={dataFinal}
        setDataFinal={setDataFinal}
        onRefresh={() => refetch()}
        isFetching={isFetching}
      />

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          Erro ao carregar painel de produção.
        </div>
      ) : (
        <>
          <ProductionSummaryCards
            summary={summary}
          />

          <ProductionCharts
            summary={summary}
            ligas={ligas}
          />

          {isLoading ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
              Carregando painel...
            </div>
          ) : (
            <ProductionTable rows={ligas} />
          )}
        </>
      )}
    </div>
  );
}
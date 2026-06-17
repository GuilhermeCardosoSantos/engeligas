import {
    ProductionLigaRow,
    ProductionSummary,
  } from "./types";
  
  export const COLORS = {
    orange: "#f97316",
    blue: "#465fff",
    green: "#12b76a",
    yellow: "#f59e0b",
    red: "#ef4444",
    purple: "#7c3aed",
    cyan: "#06b6d4",
    gray: "#667085",
  };
  
  export const PIE_COLORS = [
    COLORS.orange,
    COLORS.blue,
    COLORS.green,
    COLORS.yellow,
    COLORS.red,
    COLORS.purple,
    COLORS.cyan,
  ];
  
  export const emptySummary: ProductionSummary = {
    total_itens: 0,
    itens_em_aberto: 0,
    pedidos_alerta: 0,
    pedidos_atraso: 0,
    finalizados_no_prazo: 0,
    finalizados_antecipados: 0,
    finalizados_em_atraso: 0,
    finalizados_em_alerta: 0,
    peso_em_producao: 0,
    peso_produzido: 0,
    cancelados: 0,
    cumprimento_prazo: 0,
    pedidos: 0,
  };
  
  function toDateInputValue(date: Date) {
    const year = date.getFullYear();
  
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");
  
    const day = String(
      date.getDate()
    ).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  }
  
  export function getMonthStart() {
    const now = new Date();
  
    return toDateInputValue(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      )
    );
  }
  
  export function getMonthEnd() {
    const now = new Date();
  
    return toDateInputValue(
      new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      )
    );
  }
  
  export function formatNumber(value?: number) {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Number(value ?? 0));
  }
  
  export function formatWeight(value?: number) {
    return `${formatNumber(value)} KG`;
  }
  
  export function formatPercent(value?: number) {
    return `${formatNumber(value)}%`;
  }
  
  export function getTotalFinalizados(
    summary: ProductionSummary
  ) {
    return (
      Number(summary.finalizados_no_prazo ?? 0) +
      Number(summary.finalizados_antecipados ?? 0) +
      Number(summary.finalizados_em_alerta ?? 0) +
      Number(summary.finalizados_em_atraso ?? 0)
    );
  }
  
  export function getTopLigas(
    ligas: ProductionLigaRow[],
    limit = 8
  ) {
    return [...ligas]
      .sort((a, b) => {
        const totalB =
          Number(b.produzido ?? 0) +
          Number(b.a_produzir ?? 0);
  
        const totalA =
          Number(a.produzido ?? 0) +
          Number(a.a_produzir ?? 0);
  
        return totalB - totalA;
      })
      .slice(0, limit)
      .map((item) => ({
        liga: item.liga,
        produzido: Number(item.produzido ?? 0),
        a_produzir: Number(item.a_produzir ?? 0),
        type: "weight",
      }));
  }
  
  export function getFormatoData(
    ligas: ProductionLigaRow[]
  ) {
    return [
      {
        name: "Bucha",
        value: ligas.reduce(
          (acc, item) =>
            acc + Number(item.bucha ?? 0),
          0
        ),
        type: "weight",
      },
      {
        name: "B.Chata",
        value: ligas.reduce(
          (acc, item) =>
            acc + Number(item.b_chata ?? 0),
          0
        ),
        type: "weight",
      },
      {
        name: "Flange",
        value: ligas.reduce(
          (acc, item) =>
            acc + Number(item.flange ?? 0),
          0
        ),
        type: "weight",
      },
      {
        name: "Sextavado",
        value: ligas.reduce(
          (acc, item) =>
            acc + Number(item.sextavado ?? 0),
          0
        ),
        type: "weight",
      },
      {
        name: "Tarugo",
        value: ligas.reduce(
          (acc, item) =>
            acc + Number(item.tarugo ?? 0),
          0
        ),
        type: "weight",
      },
      {
        name: "Redondo",
        value: ligas.reduce(
          (acc, item) =>
            acc + Number(item.redondo ?? 0),
          0
        ),
        type: "weight",
      },
      {
        name: "Modelo",
        value: ligas.reduce(
          (acc, item) =>
            acc + Number(item.modelo ?? 0),
          0
        ),
        type: "weight",
      },
    ].filter((item) => item.value > 0);
  }
  
  export function getWeightCompareData(
    summary: ProductionSummary
  ) {
    return [
      {
        name: "Produzido",
        value: Number(
          summary.peso_produzido ?? 0
        ),
        type: "weight",
      },
      {
        name: "A produzir",
        value: Number(
          summary.peso_em_producao ?? 0
        ),
        type: "weight",
      },
    ];
  }
  
  export function getStatusData(
    summary: ProductionSummary
  ) {
    const totalFinalizados =
      getTotalFinalizados(summary);
  
    return [
      {
        name: "Em aberto",
        value: Number(
          summary.itens_em_aberto ?? 0
        ),
        color: COLORS.blue,
      },
      {
        name: "Alerta",
        value: Number(
          summary.pedidos_alerta ?? 0
        ),
        color: COLORS.yellow,
      },
      {
        name: "Atraso",
        value: Number(
          summary.pedidos_atraso ?? 0
        ),
        color: COLORS.red,
      },
      {
        name: "Finalizados",
        value: totalFinalizados,
        color: COLORS.green,
      },
      {
        name: "Cancelados",
        value: Number(
          summary.cancelados ?? 0
        ),
        color: COLORS.gray,
      },
    ].filter((item) => item.value > 0);
  }
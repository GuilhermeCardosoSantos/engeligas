export type ProductionSummary = {
    total_itens: number;
    itens_em_aberto: number;
    pedidos_alerta: number;
    pedidos_atraso: number;
    finalizados_no_prazo: number;
    finalizados_antecipados: number;
    finalizados_em_atraso: number;
    finalizados_em_alerta: number;
    peso_em_producao: number;
    peso_produzido: number;
    cancelados: number;
    cumprimento_prazo: number;
    pedidos: number;
  };
  
  export type ProductionLigaRow = {
    liga: string;
    produzido: number;
    a_produzir: number;
    representatividade: number;
    bucha: number;
    b_chata: number;
    flange: number;
    sextavado: number;
    tarugo: number;
    redondo: number;
    modelo: number;
  };
  
  export type ProductionPanelData = {
    periodo?: {
      data_inicial: string;
      data_final: string;
    };
    summary: ProductionSummary;
    ligas: ProductionLigaRow[];
  };
  
  export type ChartPayloadType =
    | "weight"
    | "percent"
    | "number";
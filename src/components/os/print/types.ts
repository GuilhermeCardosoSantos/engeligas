export type Medida = {
    valor: string;
    unidade: string;
  };
  
  export type OSPrintMode =
    | "geral"
    | "usinagem"
    | "fundicao";
  
  export type OSPrintProps = {
    os: any;
    obs: string;
    setor?: string;
    tipo?: "normal" | "fundicao";
  };
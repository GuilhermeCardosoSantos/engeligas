export type Medida = {
    valor: string;
    unidade: string;
  };
  
  export type OSProfile = {
    id: number;
  
    order_id: number;
    pedido_id: number;
  
    cliente?: string;
    vendedor?: string;
    emissao?: string;
    previsto?: string;
    frete?: string;
    condicao_pagamento?: string;
    forma_pagamento?: string;
    metodo_pagamento?: string;
    order_status?: string;
    total_pedido?: number;
  
    produto_original?: string;
    obs_original?: string;
    item?: string;
    liga?: string;
    medidas?: Medida[];
    unidade?: string;
    quantidade?: number;
    sobre_metal?: number;
    peso_unitario?: number;
    peso_total?: number;
    valor_unitario?: number;
    valor_total?: number;
    status?: string;
  
    created_at?: string;
    updated_at?: string;
  };
  
  export type OSProfileProps = {
    os: OSProfile;
  };
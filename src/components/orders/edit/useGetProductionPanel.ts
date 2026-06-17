import { useQuery } from "@tanstack/react-query";

import OrderApi from "@/api/order";

export function useGetProductionPanel(
  dataInicial: string,
  dataFinal: string
) {
  return useQuery({
    queryKey: [
      "production-panel",
      dataInicial,
      dataFinal,
    ],

    enabled: !!dataInicial && !!dataFinal,

    queryFn: async () => {
      const response =
        await OrderApi.GetProductionPanel(
          dataInicial,
          dataFinal
        );

      switch (response?.status) {
        case 200:
          return response.data.data;

        default:
          throw new Error(
            "Erro ao buscar painel de produção."
          );
      }
    },
  });
}
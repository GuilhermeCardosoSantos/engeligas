import { useQuery } from "@tanstack/react-query";

import OrderApi from "@/api/order";

export function useGetOrderByPedidoId(
  pedidoId: number
) {
  return useQuery({
    queryKey: [
      "order-pedido",
      pedidoId
    ],

    enabled: !!pedidoId,

    queryFn: async () => {
      const response =
        await OrderApi.FindOrderByPedidoId(
          pedidoId
        );

      switch (response?.status) {
        case 200:
          return response.data;

        case 404:
          throw new Error(
            response.data.message
          );

        default:
          throw new Error(
            "Erro ao buscar pedido."
          );
      }
    },
  });
}
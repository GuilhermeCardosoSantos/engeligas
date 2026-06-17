import { useQuery } from "@tanstack/react-query";

import OrderApi from "@/api/order";

export function useGetOrderImages(
  pedidoId: number
) {
  return useQuery({
    queryKey: [
      "order-images",
      pedidoId,
    ],

    enabled: !!pedidoId,

    queryFn: async () => {
      const response =
        await OrderApi.FindOrderImages(
          pedidoId
        );

      switch (response?.status) {
        case 200:
          return response.data.data ?? [];

        case 404:
          return [];

        default:
          throw new Error(
            "Erro ao buscar imagens do pedido."
          );
      }
    },
  });
}
import { useQuery } from "@tanstack/react-query";

import OrderApi from "@/api/order";

export function useGetOrderById(
  id: number
) {
  return useQuery({
    queryKey: ["order", id],

    enabled: !!id,

    queryFn: async () => {
      const response =
        await OrderApi.FindOrderById(id);

      switch (response?.status) {
        case 200:
          return response.data.data[0].find_order_by_id;

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
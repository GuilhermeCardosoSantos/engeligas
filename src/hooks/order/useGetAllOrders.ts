import { useQuery } from "@tanstack/react-query";

import OrderApi from "@/api/order";

export function useGetAllOrders() {
  return useQuery({
    queryKey: ["orders"],

    queryFn: async () => {
      const response =
        await OrderApi.FindAllOrders();

      switch (response?.status) {
        case 200:
          return response.data;

        default:
          throw new Error(
            "Erro ao buscar pedidos."
          );
      }
    },
  });
}
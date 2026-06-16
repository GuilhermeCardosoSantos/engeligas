import { useQuery } from "@tanstack/react-query";

import OrderApi from "@/api/order";

export function useGetAllProducts() {
  return useQuery({
    queryKey: ["order-products"],

    queryFn: async () => {
      const response =
        await OrderApi.FindAllProducts();
      switch (response?.status) {
        case 200:
          return response.data.data;

        default:
          throw new Error(
            "Erro ao buscar produtos."
          );
      }
    },
  });
}
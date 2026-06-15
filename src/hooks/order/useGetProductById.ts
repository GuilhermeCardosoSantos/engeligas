import { useQuery } from "@tanstack/react-query";

import OrderApi from "@/api/order";

export function useGetProductById(
  id: number
) {
  return useQuery({
    queryKey: ["product", id],

    enabled: !!id,

    queryFn: async () => {
      const response =
        await OrderApi.FindProductById(id);

      switch (response?.status) {
        case 200:
          return response.data;

        case 404:
          throw new Error(
            response.data.message
          );

        default:
          throw new Error(
            "Erro ao buscar produto."
          );
      }
    },
  });
}
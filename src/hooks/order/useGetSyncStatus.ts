import { useQuery } from "@tanstack/react-query";

import OrderApi from "@/api/order";

export function useGetSyncStatus() {
  return useQuery({
    queryKey: ["crawler-status"],

    refetchInterval: 1000,

    queryFn: async () => {
      const response =
        await OrderApi.GetSyncStatus();

      switch (response?.status) {
        case 200:
          return response.data;

        default:
          throw new Error(
            "Erro ao buscar status."
          );
      }
    },
  });
}
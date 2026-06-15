import { useQuery } from "@tanstack/react-query";

import OrderApi from "@/api/order";

export function useGetSyncStatus() {
  return useQuery({
    queryKey: ["crawler-status"],

    queryFn: async () => {

      const response =
        await OrderApi.GetSyncStatus();

      switch (response?.status) {

        case 200:
          return response.data;

        case 401:
          throw new Error(
            response.data.message
          );

        case 500:
          throw new Error(
            response.data.message
          );

        default:
          throw new Error(
            "Erro ao buscar status do crawler."
          );

      }
    },

    refetchInterval: (query) => {

      const data =
        query.state.data as
          | { running?: boolean }
          | undefined;

      return data?.running
        ? 1000
        : 5000;

    },

    refetchOnWindowFocus: true,

    refetchOnReconnect: true,

    staleTime: 0,
  });
}
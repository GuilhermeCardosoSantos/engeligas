import { useMutation } from "@tanstack/react-query";

import OrderApi from "@/api/order";

export function useStartSync() {
  return useMutation({
    mutationFn: async () => {

      const response =
        await OrderApi.StartSync();

      switch (response?.status) {

        case 200:
          return response.data;

        case 409:
          throw new Error(
            response.data.message
          );

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
            "Erro ao iniciar sincronização."
          );

      }
    },
  });
}
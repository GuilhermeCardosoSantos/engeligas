import { useMutation } from "@tanstack/react-query";

import OrderApi from "@/api/order";

export function useUpdateOrder() {
  return useMutation({
    mutationFn: async (
      data: any
    ) => {
      const response =
        await OrderApi.UpdateOrder(
          data
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
            "Erro ao atualizar pedido."
          );
      }
    },
  });
}
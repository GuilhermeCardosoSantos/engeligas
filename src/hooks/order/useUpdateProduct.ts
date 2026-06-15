import { useMutation } from "@tanstack/react-query";

import OrderApi from "@/api/order";

export function useUpdateProduct() {
  return useMutation({
    mutationFn: async (
      data: any
    ) => {
      const response =
        await OrderApi.UpdateProduct(
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
            "Erro ao atualizar produto."
          );
      }
    },
  });
}
import { useMutation } from "@tanstack/react-query";

import OrderApi from "@/api/order";

export function useDeleteOrderProduct() {

  return useMutation({

    mutationFn: async (
      id: number
    ) => {

      const response =
        await OrderApi.DeleteOrderProduct(
          id
        );

      switch (
        response?.status
      ) {

        case 200:
          return response.data;

        case 404:
          throw new Error(
            response.data.message
          );

        case 500:
          throw new Error(
            response.data.message
          );

        default:
          throw new Error(
            "Erro inesperado."
          );

      }

    },

  });

}
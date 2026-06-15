import { useMutation } from "@tanstack/react-query";

import OrderApi from "@/api/order";

export function useImportOrder() {
  return useMutation({
    mutationFn: async (
      file: File
    ) => {
      const response =
        await OrderApi.ImportOrder(
          file
        );

      switch (response?.status) {
        case 200:
          return response.data;

        case 422:
          throw new Error(
            response.data.message
          );

        default:
          throw new Error(
            "Erro ao importar pedido."
          );
      }
    },
  });
}
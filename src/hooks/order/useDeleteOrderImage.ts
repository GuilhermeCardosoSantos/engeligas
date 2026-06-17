import { useMutation } from "@tanstack/react-query";

import OrderApi from "@/api/order";

type DeleteOrderImageProps = {
  pedidoId: number;
  filename: string;
};

export function useDeleteOrderImage() {
  return useMutation({
    mutationFn: async ({
      pedidoId,
      filename,
    }: DeleteOrderImageProps) => {
      const response =
        await OrderApi.DeleteOrderImage(
          pedidoId,
          filename
        );

      switch (response?.status) {
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
            "Erro ao remover imagem."
          );
      }
    },
  });
}
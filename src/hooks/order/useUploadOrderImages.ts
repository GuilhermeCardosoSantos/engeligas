import { useMutation } from "@tanstack/react-query";

import OrderApi from "@/api/order";

type UploadOrderImagesProps = {
  pedidoId: number;
  files: File[];
};

export function useUploadOrderImages() {
  return useMutation({
    mutationFn: async ({
      pedidoId,
      files,
    }: UploadOrderImagesProps) => {
      const response =
        await OrderApi.UploadOrderImages(
          pedidoId,
          files
        );

      switch (response?.status) {
        case 200:
          return response.data;

        case 422:
          throw new Error(
            response.data.message
          );

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
            "Erro ao enviar imagens."
          );
      }
    },
  });
}
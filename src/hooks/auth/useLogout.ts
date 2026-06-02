import { useMutation } from "@tanstack/react-query";

import AuthApi from "@/api/auth";

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const response =
        await AuthApi.Logout();

      switch (response?.status) {

        case 204:
          return;

        case 400:
          throw new Error(
            response.data.message ||
            "Requisição inválida."
          );

        case 401:
          throw new Error(
            response.data.message ||
            "Sessão inválida."
          );

        case 422:
          throw new Error(
            response.data.message ||
            "Dados inválidos."
          );

        case 500:
          throw new Error(
            response.data.message ||
            "Erro interno do servidor."
          );

        default:
          throw new Error(
            "Erro inesperado."
          );
      }
    },
  });
}
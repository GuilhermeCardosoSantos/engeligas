import { useMutation } from "@tanstack/react-query";
// 
import UserApi from "@/api/user";

export function useGetUserByEmail() {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await UserApi.GetUserByEmail(email);

      switch (response?.status) {
        case 200:
          return response.data;

        case 404:
          throw new Error(
            "Usuário não encontrado."
          );

        case 500:
          throw new Error(
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
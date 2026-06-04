import { useQuery } from "@tanstack/react-query";
import UserApi from "@/api/user";

export function useGetUserById(
  id: string
) {
  return useQuery({
    queryKey: ["user", id],

    queryFn: async () => {
      const response =
        await UserApi.GetUserById(id);
      switch (response?.status) {
        case 200:
          return response.data.user[0];

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

    enabled: !!id,
  });
}
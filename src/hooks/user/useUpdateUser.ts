import { useMutation } from "@tanstack/react-query";

import UserApi from "@/api/user";

interface UpdateUserProps {
  id: string;
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  role?: string;
  status?: string;
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: async (
      data: UpdateUserProps
    ) => {
      const response =
        await UserApi.UpdateUser(data);

      switch (response?.status) {
        case 200:
          return response.data;

        case 404:
          throw new Error(
            response.data.message
          );

        case 422:
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
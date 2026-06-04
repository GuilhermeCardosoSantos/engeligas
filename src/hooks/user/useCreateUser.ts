import { useMutation } from "@tanstack/react-query";

import UserApi from "@/api/user";

interface CreateUserProps {
  status: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  cpf: string;
  password: string;
}

export function useCreateUser() {
  return useMutation({
    mutationFn: async ({
      status,
      name,
      email,
      role,
      phone,
      cpf,
      password,
    }: CreateUserProps) => {
      const response =
        await UserApi.CreateUser(
          status,
          name,
          email,
          role,
          phone,
          cpf,
          password
        );

      switch (response?.status) {
        case 201:
          return response.data;

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
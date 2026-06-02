import { useMutation } from "@tanstack/react-query";

import AuthApi from "@/api/auth";

interface ForgotPasswordProps {
  email: string;
  phone: string;
  cpf: string;
  new_password: string;
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async ({
      email,
      phone,
      cpf,
      new_password,
    }: ForgotPasswordProps) => {

      const response = await AuthApi.ForgotPassword(
          email,
          phone,
          cpf,
          new_password
        );

      switch (response?.status) {

        case 200:
          return response.data;

        case 401:
          throw new Error(
            response.data.message ||
            "Dados inválidos."
          );

        case 404:
          throw new Error(
            response.data.message ||
            "Usuário não encontrado."
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
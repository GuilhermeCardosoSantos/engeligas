import { useMutation } from "@tanstack/react-query";

import LoguinApi from "@/api/auth";


export function useLoguin() {
    return useMutation({
      mutationFn: async ({
        email,
        password,
        remember
      }: {
        email: string;
        password: string;
        remember: boolean
      }) => {
        const response = await LoguinApi.Loguin(
          email,
          password,
          remember
        );
        switch (response?.status) {
          case 200:
            return response.data;
  
          case 401:
            throw new Error(
              response.data.message
            );
  
          case 403:
            throw new Error(
              response.data.message
            );
  
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
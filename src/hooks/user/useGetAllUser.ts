import { useQuery } from "@tanstack/react-query";

import UserApi from "@/api/user";

export function useGetAllUsers() {
    return useQuery({
        queryKey: ["users"],

        queryFn: async () => {
            const response =
                await UserApi.GetAllUser();

            switch (response?.status) {
                case 200:
                    return response.data.users;

                case 500:
                    throw new Error(
                        response.data.message ??
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
import axios from "axios";

class UserApi {
    basePath = `${process.env.NEXT_PUBLIC_API_URL}user/`;

    //#region POST
    CreateUser = async (
        status: string,
        name  : string,
        email : string,
        role  : string,
        phone : string,
        cpf   : string,
        password: string
    ) => {
        try {
            const response = await axios.post(`${this.basePath}`, {
                email,
                role,
                status,
                phone,
                name,
                cpf,
                password
            },
                {
                    withCredentials: true,
                    validateStatus: (status) => {
                        return (
                            status === 201 ||
                            status === 422 ||
                            status === 500
                        );
                    },
                },

            )

            return response

        } catch (e) {
            console.error(e)
        }
    }

    //#endregion


    //#region GET

    GetUserByEmail = async (email: string) => {
        try {
            const response = await axios.get(`${this.basePath}email/${email}`,
                {
                    validateStatus: (status) => {
                        return (
                            status === 200 ||
                            status === 404 ||
                            status === 500
                        );
                    },
                },

            )
            return response
        } catch (error) {
            console.error("Erro ao chamar GetUserByEmail:", error);
        }
    }

    GetUserById = async (id: string) => {
        try {
            const response = await axios.get(`${this.basePath}id/${id}`,
                {
                    withCredentials: true,
                    validateStatus: (status) => {
                        return (
                            status === 200 ||
                            status === 404 ||
                            status === 500
                        );
                    },
                },

            )
            return response
        } catch (error) {
            console.error("Erro ao chamar GetUserById:", error);
        }
    }

    GetAllUser = async () => {
        try {
            const response = await axios.get(`${this.basePath}`,
                {
                    withCredentials: true,
                    validateStatus: (status) => {
                        return (
                            status === 200 ||
                            status === 500
                        );
                    },
                },

            )
            return response
        } catch (error) {
            console.error("Erro ao chamar GetUserByEmail:", error);
        }
    }

    //#endregion

    //#region PUT

    UpdateUser = async (data: {
        id: string;
        name?: string;
        email?: string;
        cpf?: string;
        phone?: string;
        role?: string;
        status?: string;
    }) => {
        try {
            const response = await axios.put(
                this.basePath,
                data,
                {
                    withCredentials: true,
                    validateStatus: (status) =>
                        [
                            200,
                            404,
                            422,
                            500,
                        ].includes(status),
                }
            );

            return response;
        } catch (error) {
            console.error(
                "Erro ao atualizar usuário:",
                error
            );
        }
    };

    //#endregion

}

export default new UserApi();
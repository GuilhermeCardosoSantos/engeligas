import axios from "axios";

class LoguinApi {
    basePath = `${process.env.NEXT_PUBLIC_API_URL}auth/`;


    //#region GET

    Logout = async () => {
        try {
            const response = await axios.get(`${this.basePath}logout`,
                {
                    withCredentials: true,
                    validateStatus: (status) => {
                        return (
                            status === 204 ||
                            status === 401 ||
                            status === 400 ||
                            status === 422 ||
                            status === 500
                        );
                    },
                },

            )

            return response

        } catch (error) {
            console.error("Erro ao chamar Logout:", error);
        }
    }


    //#endregion


    //#region POST

    Loguin = async (email: string, password: string, remember: boolean) => {
        try {
            const response = await axios.post(`${this.basePath}loguin`, {
                email,
                password,
                remember,
            },
                {
                    withCredentials: true,
                    validateStatus: (status) => {
                        return (
                            status === 200 ||
                            status === 401 ||
                            status === 422 ||
                            status === 500
                        );
                    },
                },

            )

            return response

        } catch (error) {
            console.error("Erro ao chamar Loguin:", error);
        }
    }

    //#endregion

    //#region PATCH

    ForgotPassword = async (email: string, phone: string, cpf: string, new_password: string) => {
        try {
            const response = await axios.patch(`${this.basePath}forgotpassword`, {
                email,
                phone,
                cpf,
                new_password
            },
                {
                    validateStatus: (status) => {
                        return (
                            status === 200 ||
                            status === 401 ||
                            status === 404 ||
                            status === 422 ||
                            status === 500
                        );
                    },
                },

            )

            return response
        } catch (error) {
            console.error("Erro ao chamar ForgotPassword:", error);
        }
    }

    //#endregion
}

export default new LoguinApi();
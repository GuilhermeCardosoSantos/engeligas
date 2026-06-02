import axios from "axios";

class UserApi {
    basePath = `${process.env.NEXT_PUBLIC_API_URL}user/`;

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

    //#endregion

}

export default new UserApi();
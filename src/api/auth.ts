import axios from "axios";

class LoguinApi {
    // withCredentials: true
    basePath = `${process.env.NEXT_PUBLIC_API_URL}auth/`;

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
            alert(error)
            console.error("Erro ao chamar loguin:", error);
        }
    }

    //#endregion

}

export default new LoguinApi();
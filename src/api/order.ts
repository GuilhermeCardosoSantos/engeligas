import axios from "axios";

class OrderApi {

basePath = `${process.env.NEXT_PUBLIC_API_URL}order/`;

//#region GET

FindAllOrders = async () => {
    try {

        const response = await axios.get(
            `${this.basePath}`,
            {
                withCredentials: true,
                validateStatus: (status) => {
                    return (
                        status === 200 ||
                        status === 401 ||
                        status === 500
                    );
                }
            }
        );

        return response;

    } catch (error) {
        console.error(
            "Erro ao chamar FindAllOrders:",
            error
        );
    }
};

FindOrderById = async (
    id: number
) => {
    try {

        const response = await axios.get(
            `${this.basePath}id/${id}`,
            {
                withCredentials: true,
                validateStatus: (status) => {
                    return (
                        status === 200 ||
                        status === 404 ||
                        status === 401 ||
                        status === 500
                    );
                }
            }
        );

        return response;

    } catch (error) {
        console.error(
            "Erro ao chamar FindOrderById:",
            error
        );
    }
};

FindOrderByPedidoId = async (
    pedidoId: number
) => {
    try {

        const response = await axios.get(
            `${this.basePath}pedido/${pedidoId}`,
            {
                withCredentials: true,
                validateStatus: (status) => {
                    return (
                        status === 200 ||
                        status === 404 ||
                        status === 401 ||
                        status === 500
                    );
                }
            }
        );

        return response;

    } catch (error) {
        console.error(
            "Erro ao chamar FindOrderByPedidoId:",
            error
        );
    }
};

FindAllProducts = async () => {
    try {

        const response = await axios.get(
            `${this.basePath}products`,
            {
                withCredentials: true,
                validateStatus: (status) => {
                    return (
                        status === 200 ||
                        status === 401 ||
                        status === 500
                    );
                }
            }
        );

        return response;

    } catch (error) {
        console.error(
            "Erro ao chamar FindAllProducts:",
            error
        );
    }
};

FindProductById = async (
    id: number
) => {
    try {

        const response = await axios.get(
            `${this.basePath}product/${id}`,
            {
                withCredentials: true,
                validateStatus: (status) => {
                    return (
                        status === 200 ||
                        status === 404 ||
                        status === 401 ||
                        status === 500
                    );
                }
            }
        );

        return response;

    } catch (error) {
        console.error(
            "Erro ao chamar FindProductById:",
            error
        );
    }
};

StartSync = async () => {
    try {

        const response = await axios.get(
            `${this.basePath}sync`,
            {
                withCredentials: true,
                validateStatus: (status) => {
                    return (
                        status === 200 ||
                        status === 409 ||
                        status === 401 ||
                        status === 500
                    );
                }
            }
        );

        return response;

    } catch (error) {
        console.error(
            "Erro ao chamar StartSync:",
            error
        );
    }
};

GetSyncStatus = async () => {
    try {

        const response = await axios.get(
            `${this.basePath}sync/status`,
            {
                withCredentials: true,
                validateStatus: (status) => {
                    return (
                        status === 200 ||
                        status === 401 ||
                        status === 500
                    );
                }
            }
        );

        return response;

    } catch (error) {
        console.error(
            "Erro ao chamar GetSyncStatus:",
            error
        );
    }
};

FindOrderImages = async (
    pedidoId: number
  ) => {
    try {
      const response = await axios.get(
        `${this.basePath}images/${pedidoId}`,
        {
          withCredentials: true,
  
          validateStatus: (status) =>
            [
              200,
              401,
              404,
              500,
            ].includes(status),
        }
      );
  
      return response;
    } catch (error) {
      console.error(
        "Erro ao buscar imagens do pedido:",
        error
      );
    }
};

GetProductionPanel = async (
    dataInicial: string,
    dataFinal: string
  ) => {
    try {
      const response = await axios.get(
        `${this.basePath}production-panel`,
        {
          withCredentials: true,
  
          params: {
            data_inicial: dataInicial,
            data_final: dataFinal,
          },
  
          validateStatus: (status) =>
            [
              200,
              401,
              404,
              422,
              500,
            ].includes(status),
        }
      );
  
      return response;
    } catch (error) {
      console.error(
        "Erro ao buscar painel de produção:",
        error
      );
    }
};
//#endregion

//#region POST

ImportOrder = async (
    file: File
) => {
    try {

        const formData = new FormData();

        formData.append(
            "file",
            file
        );

        const response = await axios.post(
            `${this.basePath}import`,
            formData,
            {
                withCredentials: true,
                headers: {
                    "Content-Type":
                        "multipart/form-data"
                },
                validateStatus: (status) => {
                    return (
                        status === 200 ||
                        status === 401 ||
                        status === 422 ||
                        status === 500
                    );
                }
            }
        );

        return response;

    } catch (error) {
        console.error(
            "Erro ao chamar ImportOrder:",
            error
        );
    }
};

UploadOrderImages = async (
    pedidoId: number,
    files: File[]
  ) => {
    try {
      const formData = new FormData();
  
      files.forEach((file) => {
        formData.append("files", file);
      });
  
      const response = await axios.post(
        `${this.basePath}images/${pedidoId}`,
        formData,
        {
          withCredentials: true,
  
          headers: {
            "Content-Type": "multipart/form-data",
          },
  
          validateStatus: (status) =>
            [
              200,
              401,
              404,
              422,
              500,
            ].includes(status),
        }
      );
  
      return response;
    } catch (error) {
      console.error(
        "Erro ao enviar imagens do pedido:",
        error
      );
    }
};

//#endregion

//#region PUT

UpdateOrder = async (
    data: any
) => {
    try {

        const response = await axios.put(
            `${this.basePath}`,
            data,
            {
                withCredentials: true,
                validateStatus: (status) => {
                    return (
                        status === 200 ||
                        status === 404 ||
                        status === 422 ||
                        status === 500
                    );
                }
            }
        );

        return response;

    } catch (error) {
        console.error(
            "Erro ao chamar UpdateOrder:",
            error
        );
    }
};

UpdateProduct = async (
    data: any
) => {
    try {

        const response = await axios.put(
            `${this.basePath}product`,
            data,
            {
                withCredentials: true,
                validateStatus: (status) => {
                    return (
                        status === 200 ||
                        status === 404 ||
                        status === 422 ||
                        status === 500
                    );
                }
            }
        );

        return response;

    } catch (error) {
        console.error(
            "Erro ao chamar UpdateProduct:",
            error
        );
    }
};

//#endregion


// #region DELETE

DeleteOrderImage = async (
    pedidoId: number,
    filename: string
  ) => {
    try {
      const response = await axios.delete(
        `${this.basePath}image/${pedidoId}/${encodeURIComponent(filename)}`,
        {
          withCredentials: true,
  
          validateStatus: (status) =>
            [
              200,
              401,
              404,
              500,
            ].includes(status),
        }
      );
  
      return response;
    } catch (error) {
      console.error(
        "Erro ao remover imagem do pedido:",
        error
      );
    }
};

DeleteOrder = async (
    id: number
  ) => {
    try {
  
      const response =
        await axios.delete(
          `${this.basePath}${id}`,
          {
            withCredentials: true,
  
            validateStatus: (
              status
            ) => {
  
              return (
                status === 200 ||
                status === 404 ||
                status === 500
              );
  
            },
          }
        );
  
      return response;
  
    } catch (error) {
  
      console.error(
        "Erro ao excluir pedido:",
        error
      );
  
    }
};

DeleteOrderProduct = async (
    id: number
  ) => {
    try {
  
      const response =
        await axios.delete(
          `${this.basePath}product/${id}`,
          {
            withCredentials: true,
  
            validateStatus: (
              status
            ) => {
  
              return (
                status === 200 ||
                status === 404 ||
                status === 500
              );
  
            },
          }
        );
  
      return response;
  
    } catch (error) {
  
      console.error(
        "Erro ao excluir produto:",
        error
      );
  
    }
};

// #endregion

}

export default new OrderApi();

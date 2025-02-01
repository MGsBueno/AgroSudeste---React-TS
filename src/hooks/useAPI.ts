import axios, { AxiosRequestConfig } from "axios";
import { URL_BASE } from "../util/constants";
import ResultadoPaginado from "../interfaces/ResultadoPaginado";

const useAPI = <T>(endpoint: string) => {
  const axiosInstance = axios.create({
    baseURL: URL_BASE,
  });

  const recuperar = () =>
    axiosInstance
      .get<T[]>(endpoint)
      .then((res) => res.data)
      .catch((error) => {
        tratarErro(error);
        throw error;
      });

  const remover = (id: number) =>
    axiosInstance
      .delete<T>(endpoint + "/" + id)
      .then((res) => res.data)
      .catch((error) => {
        tratarErro(error);
        throw error;
      });

  const recuperarPagina = (config: AxiosRequestConfig) =>
    axiosInstance
      .get<ResultadoPaginado<T>>(endpoint + "/paginacao", config)
      .then((res) => res.data)
      .catch((error) => {
        tratarErro(error);
        throw error;
      });

  const cadastrar = (obj: T) =>
    axiosInstance
      .post<T>(endpoint, obj)
      .then((res) => res.data)
      .catch((error) => {
        tratarErro(error);
        throw error;
      });

  const alterar = (obj: T) =>
    axiosInstance
      .put<T>(endpoint, obj)
      .then((res) => res.data)
      .catch((error) => {
        tratarErro(error);
        throw error;
      });

  const tratarErro = (error: any) => {
    console.log("Erro: ", error);

    if (error.response) {
      console.log(
        "A requisição foi realizada e o servidor respondeu com as seguintes informações: "
      );
      console.log("Mensagem do servidor: ", error.response.data);
      console.log("Código de status: ", error.response.status);
    } else if (error.request && error.config) {
      console.log(
        "A requisição foi realizada mas nenhuma resposta foi recebida."
      );
      console.log("URL Base: ", error.config.baseURL);
      console.log("Método de envio: ", error.config.method);
      console.log("URL solicitado: ", error.config.url);
    } else {
      console.log(
        "Algo aconteceu durante a configuração do pedido que acionou um erro: ",
        error.message
      );
    }
  };

  return { recuperar, remover, recuperarPagina, cadastrar, alterar };
};
export default useAPI;

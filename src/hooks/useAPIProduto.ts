import axios, { AxiosRequestConfig } from "axios";
import Produto from "../interfaces/Produto";
import { URL_BASE, URL_PRODUTOS } from "../util/constants";
import ResultadoPaginado from "../interfaces/ResultadoPaginado";

const useAPIProduto = () => {
  const axiosInstance = axios.create({
    baseURL: URL_BASE,
  });

  const recuperarProdutosPorNomeDaCategoria = (nome?: string) =>
    axiosInstance
      .get<Produto[]>(URL_PRODUTOS + (nome ? "/categoria/" + nome : ""))
      .then((res) => res.data)
      .catch((error) => {
        tratarErro(error);
        throw error;
      });

  const recuperarProdutosPaginadosPeloNomeDaCategoria = (config: AxiosRequestConfig) =>
    axiosInstance
      .get<ResultadoPaginado<Produto>>(URL_PRODUTOS + "/categoria/paginacao", config)
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

  return { recuperarProdutosPorNomeDaCategoria, recuperarProdutosPaginadosPeloNomeDaCategoria };
};
export default useAPIProduto;

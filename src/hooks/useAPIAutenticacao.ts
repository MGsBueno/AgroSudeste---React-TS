import axios from "axios";
import { URL_AUTENTICACAO, URL_BASE } from "../util/constants";
import TokenResponse from "../interfaces/TokenResponse";
import Usuario from "../interfaces/Usuario";

const useAPIAutenticacao = () => {
  const axiosInstance = axios.create({
    baseURL: URL_BASE,
  });

  // Envia um Usuario com conta e senha e recebe de volta um Token
  const login = (usuario: Usuario) =>
    axiosInstance
      .post<TokenResponse>(URL_AUTENTICACAO + "/login", usuario)
      .then((res) => res.data)
      .catch((error) => {
        tratarErro(error);
        throw error;
      });

  // Envia um Usuario para o cadastro e recebe de volta um Token, ou erro se usuário já existe
  const cadastro = (usuario: Usuario) =>
    axiosInstance
      .post<TokenResponse>(URL_AUTENTICACAO + "/cadastro", usuario)
      .then((res) => {
        // Verifica se o token está vazio, indicando que o usuário já existe
        if (res.data.token === "") {
          throw new Error("Usuário já existe");
        }
        console.log("Cadastro com Sucesso", res.data);
        return res.data;
      })
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

  return { login, cadastro };
};
export default useAPIAutenticacao;

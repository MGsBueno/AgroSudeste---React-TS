import { useMutation } from "@tanstack/react-query";
import useAPIAutenticacao from "./useAPIAutenticacao";
import Usuario from "../interfaces/Usuario";
import useUsuarioStore from "../store/useUsuarioStore";

const useEfetuarCadastro = () => {
  const { cadastro } = useAPIAutenticacao();
  const setUsuarioLogado = useUsuarioStore((state) => state.setUsuarioLogado);

  return useMutation({
    mutationFn: async (usuario: Usuario) => {
      const resposta = await cadastro(usuario);

      if (resposta?.token) {
        localStorage.setItem("token", resposta.token);
        localStorage.setItem("usuario", usuario.conta);
        setUsuarioLogado(usuario.conta, resposta.token);
      }
      return resposta;
    },
  });
};

export default useEfetuarCadastro;

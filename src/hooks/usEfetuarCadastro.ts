import { useMutation } from "@tanstack/react-query";
import useAPIAutenticacao from "./useAPIAutenticacao";
import Usuario from "../interfaces/Usuario";

const useEfetuarCadastro = () => {
  const { cadastro } = useAPIAutenticacao();

  return useMutation({
    mutationFn: (usuario: Usuario) => cadastro(usuario),
  });
};

export default useEfetuarCadastro;

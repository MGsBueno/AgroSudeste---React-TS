import { useMutation, useQueryClient } from "@tanstack/react-query";
import { URL_PRODUTOS } from "../util/constants";
import useAPI from "./useAPI";
import Produto from "../interfaces/Produto";

const useCadastrarProduto = () => {
  const {cadastrar} = useAPI<Produto>(URL_PRODUTOS);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (produto: Produto) => cadastrar(produto),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["produtos"],
      }),
  });
};

export default useCadastrarProduto;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { URL_PRODUTOS } from "../util/constants";
import useAPI from "./useAPI";
import Produto from "../interfaces/Produto";

const useRemoverProduto = () => {
  const {remover} = useAPI<Produto>(URL_PRODUTOS);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => remover(id),
      // axios
      //   .delete("http://localhost:8080/produtos/" + id)
      //   .then((res) => res.data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["produtos"],
      }),
  });
};

export default useRemoverProduto;

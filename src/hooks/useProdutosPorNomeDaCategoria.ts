import { useQuery } from "@tanstack/react-query";
import useAPIProduto from "./useAPIProduto";

const useProdutosPorNomeDaCategoria = (nome?: string) => {
  const { recuperarProdutosPorNomeDaCategoria } = useAPIProduto();
  return useQuery({
    queryKey: nome ? ["produtos", "categoria", nome] : ["produtos"],
    queryFn: () => recuperarProdutosPorNomeDaCategoria(nome),
    staleTime: 10_000,
  });
};
export default useProdutosPorNomeDaCategoria;

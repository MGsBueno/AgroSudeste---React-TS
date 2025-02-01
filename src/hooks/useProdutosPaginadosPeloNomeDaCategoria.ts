import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import Produto from "../interfaces/Produto";
import ResultadoPaginado from "../interfaces/ResultadoPaginado";
import useAPIProduto from "./useAPIProduto";

interface QueryString {
  tamanho: number;
  nomeCategoria?: string;
}
const useProdutosPaginadosPeloNomeDaCategoria = (queryString: QueryString) => {
  const { recuperarProdutosPaginadosPeloNomeDaCategoria } = useAPIProduto();

  return useInfiniteQuery<ResultadoPaginado<Produto>>({
    queryKey: ["produtos", "categoria", "paginacao", queryString],
    queryFn: ({pageParam}) =>
      recuperarProdutosPaginadosPeloNomeDaCategoria({
        params: {
          pagina: pageParam,
          ...queryString,
        },
      }),
    staleTime: 10_000,
    initialPageParam: 0,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.paginaCorrente < lastPage.totalDePaginas - 1 ? lastPage.paginaCorrente + 1 : undefined;
    }
  });
};
export default useProdutosPaginadosPeloNomeDaCategoria;

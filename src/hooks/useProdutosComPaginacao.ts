import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Produto from "../interfaces/Produto";
import { URL_PRODUTOS } from "../util/constants";
import useAPI from "./useAPI";

interface QueryString {
  pagina: number;
  tamanho: number;
  nome: string;
}
const useProdutosComPaginacao = (queryString: QueryString) => {
  const { recuperarPagina } = useAPI<Produto>(URL_PRODUTOS);

  return useQuery({
    queryKey: ["produtos", "paginacao", queryString],
    queryFn: () =>
      recuperarPagina({
        params: {
          ...queryString,
        },
      }),
    // axios
    //   .get<ResultadoPaginado<Produto>>(
    //     "http://localhost:8080/produtos/paginacao",
    //     {
    //       params: {
    //         ...queryString,
    //       },
    //     }
    //   )
    //   .then((response) => response.data),
    staleTime: 10_000,
    placeholderData: keepPreviousData,
  });
};
export default useProdutosComPaginacao;

import { useQuery } from "@tanstack/react-query";
import Produto from "../interfaces/Produto";
import { URL_PRODUTOS } from "../util/constants";
import useAPI from "./useAPI";

const useProdutos = () => {
  const { recuperar } = useAPI<Produto>(URL_PRODUTOS);
  return useQuery({
    queryKey: ["produtos"],
    queryFn: () => recuperar(),
    // axios
    //     .get("http://localhost:8080/produtos")
    //     .then((response) => response.data),
    staleTime: 10_000,
  });
};
export default useProdutos;

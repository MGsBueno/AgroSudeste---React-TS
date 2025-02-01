import dayjs from "dayjs";
import useProdutosComPaginacao from "../hooks/useProdutosComPaginacao";
import useRemoverProduto from "../hooks/useRemoverProduto";
import useProdutosStore from "../store/useProdutosStore";
import { useState, useCallback } from "react";

const TabelaDeProdutos = () => {
  const pagina = useProdutosStore((s) => s.pagina);
  const tamanho = useProdutosStore((s) => s.tamanho);
  const nome = useProdutosStore((s) => s.nome);

  const setPagina = useProdutosStore((s) => s.setPagina);
  const setProdutoSelecionado = useProdutosStore(
    (s) => s.setProdutoSelecionado
  );

  const { mutate: removerProduto, error: errorRemocaoProduto } =
    useRemoverProduto();

  const [ordem, setOrdem] = useState("desc"); // Ordenação inicial (decrescente)
  const [campo, setCampo] = useState("id"); // Coluna inicial (id)

  const {
    data: resultadoPaginado,
    isPending: carregandoProdutos,
    error: errorProdutos,
  } = useProdutosComPaginacao({ pagina, tamanho, nome, campo, ordem });

  // Estado para controlar quais produtos estão sendo removidos
  const [removendoProdutoId, setRemovendoProdutoId] = useState<number | null>(
    null
  );

  const handleRemoverProduto = async (produtoId: number) => {
    setRemovendoProdutoId(produtoId); // Marca o produto como removido (muda o estado para exibir o spinner)

    // Simula a latência da remoção (1 segundo de atraso)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Chama a função de remoção
      await removerProduto(produtoId);
      setPagina(0); // Após a remoção, reseta a página
    } catch (error) {
      console.error("Erro ao remover produto:", error);
    } finally {
      // Limpa o estado após a remoção
      setRemovendoProdutoId(null);
    }
  };

  const handleOrdenar = useCallback((novaColuna: string) => {
    setCampo(novaColuna);
    setOrdem((prevOrdem) => (prevOrdem === "asc" ? "desc" : "asc"));
  }, []);

  if (carregandoProdutos) return <h6>Carregando...</h6>;

  if (errorProdutos) throw errorProdutos;
  if (errorRemocaoProduto) throw errorRemocaoProduto;

  const produtos = resultadoPaginado.itens;

  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered table-sm">
        <thead>
          <tr>
            <th
              className="align-middle text-center"
              onClick={() => handleOrdenar("id")}
            >
              Id {campo === "id" && (ordem === "asc" ? "↑" : "↓")}
            </th>
            <th className="align-middle text-center">Imagem</th>
            <th
              className="align-middle text-center"
              onClick={() => handleOrdenar("categoria.nome")}
            >
              Categoria{" "}
              {campo === "categoria.nome" && (ordem === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="align-middle text-center"
              onClick={() => handleOrdenar("nome")}
            >
              Nome {campo === "nome" && (ordem === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="align-middle text-center"
              onClick={() => handleOrdenar("dataCadastro")}
            >
              Data de Cadastro{" "}
              {campo === "dataCadastro" && (ordem === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="align-middle text-center"
              onClick={() => handleOrdenar("qtdEstoque")}
            >
              Quantidade{" "}
              {campo === "qtdEstoque" && (ordem === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="align-middle text-center"
              onClick={() => handleOrdenar("preco")}
            >
              Preço {campo === "preco" && (ordem === "asc" ? "↑" : "↓")}
            </th>
            <th className="align-middle text-center">Ação</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td width={"7%"} className="align-middle text-center">
                {produto.id}
              </td>
              <td width={"13%"} className="align-middle text-center">
                <img src={produto.imagem} width="35px" />
              </td>
              <td width={"13%"} className="align-middle text-center">
                {produto.categoria.nome}
              </td>
              <td width={"20%"} className="align-middle ps-3">
                <a
                  onClick={() => setProdutoSelecionado(produto)}
                  className="link_underline"
                >
                  {produto.nome}
                </a>
              </td>
              <td width={"13%"} className="align-middle text-center">
                {dayjs(produto.dataCadastro).format("DD/MM/YYYY")}
              </td>
              <td width={"13%"} className="align-middle text-center">
                {produto.qtdEstoque}
              </td>
              <td width={"8%"} className="align-middle text-end pe-3">
                {produto.preco.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
              </td>
              <td width={"13%"} className="align-middle text-center">
                <button
                  onClick={() => handleRemoverProduto(produto.id!)}
                  className="btn btn-danger btn-sm"
                  type="button"
                  disabled={removendoProdutoId === produto.id} // Desabilita o botão enquanto o produto está sendo removido
                >
                  {removendoProdutoId === produto.id ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Remover"
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="align-middle text-center fw-bold" colSpan={5}>
              Total...
            </td>
            <td className="align-middle text-center fw-bold" colSpan={2}>
              R${" "}
              {produtos
                .reduce(
                  (total, produto) =>
                    total + produto.qtdEstoque * produto.preco,
                  0
                )
                .toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TabelaDeProdutos;

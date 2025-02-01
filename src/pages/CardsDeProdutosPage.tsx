import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import useProdutosPaginadosPeloNomeDaCategoria from "../hooks/useProdutosPaginadosPeloNomeDaCategoria";
import useCarrinhoStore from "../store/useCarrinhoStore"; // Store para o carrinho
import Produto from "../interfaces/Produto"; // A interface Produto

// Função para colocar a primeira letra maiúscula na categoria
const primeiraLetraMaiuscula = (palavra: string) => {
  return palavra.charAt(0).toUpperCase() + palavra.slice(1);
};

const CardsDeProdutosPage = () => {
  const tamanho = 18;
  const { nomeCategoria } = useParams<{ nomeCategoria: string }>(); // Tipando o parâmetro

  const {
    data,
    isPending: carregandoProdutos,
    error: errorProdutos,
    hasNextPage,
    fetchNextPage,
  } = useProdutosPaginadosPeloNomeDaCategoria({
    tamanho,
    nomeCategoria,
  });

  // Ação para adicionar o produto ao carrinho
  const adicionarProduto = useCarrinhoStore((state) => state.adicionarProduto);

  // Se estiver carregando, exibe "Carregando..."
  if (carregandoProdutos) return <h6>Carregando...</h6>;

  // Se houver erro, lança o erro
  if (errorProdutos) throw errorProdutos;

  // Função chamada quando o botão "Comprar" é clicado
  const handleAddToCart = (produto: Produto) => {
    adicionarProduto(produto); // Adiciona o produto ao carrinho
    console.log(`Produto ${produto.nome} adicionado ao carrinho.`);
  };

  return (
    <InfiniteScroll
      style={{ height: "", overflow: "" }}
      dataLength={data.pages.reduce(
        (total, page) => total + page.totalDeItens,
        0
      )}
      hasMore={hasNextPage}
      loader={<h6>Carregando...</h6>}
      next={() => fetchNextPage()}
    >
      <h5>
        {nomeCategoria ? primeiraLetraMaiuscula(nomeCategoria) : "Produtos"}
      </h5>
      <div className="row">
        {data.pages.map((page) =>
          page.itens.map((produto: Produto) => (
            <div key={produto.id} className="col-xl-2 col-md-3 col-sm-4 col-6">
              <Card
                imagem={produto.imagem}
                titulo={produto.nome}
                descricao={produto.descricao}
                preco={produto.preco.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
                footer={
                  <input
                    type="button"
                    className="btn btn-primary btn-sm w-100"
                    value="Comprar"
                    onClick={() => handleAddToCart(produto)} // Chama a função ao clicar no botão
                  />
                }
              />
            </div>
          ))
        )}
      </div>
    </InfiniteScroll>
  );
};

export default CardsDeProdutosPage;

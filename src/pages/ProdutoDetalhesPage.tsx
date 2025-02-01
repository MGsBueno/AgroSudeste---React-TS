import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useCarrinhoStore from "../store/useCarrinhoStore"; // Carrinho auxiliar
import Produto from "../interfaces/Produto";

const ProdutoDetalhesPage = () => {
  const { produtoId } = useParams<{ produtoId: string }>(); // Obtém o ID do produto da URL
  const { produto, carregarProduto } = useCarrinhoStore((state) => ({
    produto: state.produto,
    carregarProduto: state.carregarProduto,
  }));

  // Carrega o produto quando a página é carregada
  useEffect(() => {
    carregarProduto(); // Carrega o produto salvo no carrinho auxiliar
  }, [carregarProduto]);

  if (!produto) {
    return <h6>Produto não encontrado!</h6>;
  }

  return (
    <div>
      <h1>{produto.nome}</h1>
      <img src={produto.imagem} alt={produto.nome} />
      <p>{produto.descricao}</p>
      <p>
        <strong>Preço:</strong> R${" "}
        {produto.preco.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
      <p>
        <strong>Categoria:</strong> {produto.categoria?.nome}
      </p>
      {/* Outros detalhes do produto */}
    </div>
  );
};

export default ProdutoDetalhesPage;

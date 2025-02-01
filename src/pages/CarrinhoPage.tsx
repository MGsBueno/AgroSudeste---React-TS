import useCarrinhoStore from "../store/useCarrinhoStore";
import Produto from "../interfaces/Produto";
import { useState } from "react";

const PaginaCarrinho = () => {
  const { itens, removerProduto, alterarQuantidade } = useCarrinhoStore();
  const [removendoProdutoId, setRemovendoProdutoId] = useState<number | null>(
    null
  ); // Estado para controlar a remoção do produto

  // Função para remover o produto e mostrar o spinner
  const handleRemoverProduto = async (produtoId: number) => {
    setRemovendoProdutoId(produtoId); // Marca o produto como removido
    // Simula a latência da remoção
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula um atraso de 1 segundo
    await removerProduto(produtoId); // Chama a função de remoção
    setRemovendoProdutoId(null); // Limpa o estado após a remoção
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🛒 Carrinho de Compras</h2>
      {itens.length === 0 ? (
        <div className="alert alert-warning text-center">
          Seu carrinho está vazio.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {itens.map(({ produto, quantidade }) => (
                <tr key={produto.id}>
                  <td className="text-start d-flex align-items-center">
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      width="50"
                      className="me-2 rounded"
                    />
                    {produto.nome}
                  </td>
                  <td>R$ {produto.preco.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control text-center w-50 mx-auto"
                      value={quantidade}
                      min="1"
                      onChange={(e) =>
                        alterarQuantidade(produto.id!, Number(e.target.value))
                      }
                    />
                  </td>
                  <td className="fw-bold">
                    R$ {(produto.preco * quantidade).toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoverProduto(produto.id!)}
                      disabled={removendoProdutoId === produto.id} // Desabilita o botão quando o produto está sendo removido
                    >
                      {removendoProdutoId === produto.id ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "❌ Remover"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end fw-bold">
                  Total:
                </td>
                <td className="fw-bold text-success">
                  R${" "}
                  {itens
                    .reduce(
                      (total, { produto, quantidade }) =>
                        total + produto.preco * quantidade,
                      0
                    )
                    .toFixed(2)}
                </td>
                <td>
                  <button className="btn btn-success">
                    💳 Finalizar Compra
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaginaCarrinho;

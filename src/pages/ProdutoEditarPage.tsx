import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProdutosStore from "../store/useProdutosStore";
import Produto from "../interfaces/Produto";

const ProdutoEditar = () => {
  const { produtoId } = useParams();
  const navigate = useNavigate();

  const produtoSelecionado = useProdutosStore(
    (state) => state.produtoSelecionado
  );
  const setProdutoSelecionado = useProdutosStore(
    (state) => state.setProdutoSelecionado
  );

  const [produto, setProduto] = useState<Produto>(produtoSelecionado);

  useEffect(() => {
    if (produtoId && produtoSelecionado.id !== Number(produtoId)) {
      setProduto(produtoSelecionado); // Atualiza com o produto selecionado na store
    }
  }, [produtoId, produtoSelecionado]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduto({
      ...produto,
      [name]: name === "preco" ? parseFloat(value) : value,
    });
  };

  const handleSalvar = () => {
    if (produto) {
      useProdutosStore.getState().updateProduto(produto); // Atualizando o produto na store
      navigate(`/produto/${produto.id}`); // Redireciona para a página de detalhes
    }
  };

  if (!produto.id) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Editar Produto</h2>
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="nome"
              name="nome"
              value={produto.nome}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="preco" className="form-label">
              Preço
            </label>
            <input
              type="number"
              className="form-control"
              id="preco"
              name="preco"
              value={produto.preco}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="qtdEstoque" className="form-label">
              Quantidade em Estoque
            </label>
            <input
              type="number"
              className="form-control"
              id="qtdEstoque"
              name="qtdEstoque"
              value={produto.qtdEstoque}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSalvar}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProdutoEditar;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; // Importando o Modal e o Button do react-bootstrap
import useRemoverProduto from "../hooks/useRemoverProduto"; // Importando o hook para remover o produto
import useProdutosStore from "../store/useProdutosStore"; // Importando o hook da store
import Produto from "../interfaces/Produto"; // Importando a interface Produto

const ProdutoDetalhesPage = () => {
  const location = useLocation();
  const produto = location.state as Produto; // Tipando o produto como Produto usando o TypeScript
  const navigate = useNavigate(); // Usado para navegar para outras páginas

  // Estado para controlar o modal de sucesso
  const [showModal, setShowModal] = useState(false);

  // Hook para remover o produto
  const { mutate: removerProduto, isLoading, isError } = useRemoverProduto();

  // Acessando a função de setProdutoSelecionado
  const setProdutoSelecionado = useProdutosStore(
    (state) => state.setProdutoSelecionado
  );

  if (!produto) {
    return <p>Produto não encontrado!</p>;
  }

  // Função chamada ao clicar no botão "Alterar"
  const handleAlterar = () => {
    // Atualiza o estado com todos os valores do produto selecionado antes de redirecionar
    setProdutoSelecionado({
      nome: produto.nome,
      categoria: produto.categoria,
      preco: produto.preco,
      imagem: produto.imagem,
      descricao: produto.descricao,
      dataCadastro: produto.dataCadastro,
      qtdEstoque: produto.qtdEstoque,
      disponivel: produto.disponivel, // Agora estamos usando o tipo boolean
      id: produto.id,
    });
    console.log(produto);
    navigate(`/cadastrar-produto/`, { state: produto }); // Navega para a página de alteração, passando os dados do produto
  };

  // Função chamada ao clicar no botão "Remover"
  const handleRemover = () => {
    if (produto.id) {
      removerProduto(produto.id, {
        onSuccess: () => {
          // Quando a remoção for bem-sucedida, mostramos o modal
          setShowModal(true);
        },
      });
    }
  };

  // Função para redirecionar para a página inicial após fechar o modal
  const handleCloseModal = () => {
    setShowModal(false); // Fecha o modal
    navigate("/"); // Redireciona para a página inicial após a remoção
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Detalhes do Produto</h2>
      <div className="row">
        {/* Coluna para a imagem */}
        <div className="col-md-6 mb-3">
          <img
            src={`/${produto.imagem}`}
            alt={produto.nome}
            className="img-fluid"
          />
        </div>
        {/* Coluna para o conteúdo do produto */}
        <div className="col-md-6 mb-3">
          <h3>{produto.nome}</h3>
          <p>{produto.descricao}</p>
          <p>
            <strong>Preço:</strong> R$ {produto.preco}
          </p>
          <p>
            <strong>Categoria:</strong> {produto.categoria.nome}{" "}
            {/* Exibindo o nome da categoria */}
          </p>
          <p>
            <strong>Quantidade em estoque:</strong> {produto.qtdEstoque}
          </p>
          {/* Botões abaixo do conteúdo, com espaço entre eles e centralizados */}
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-warning" onClick={handleAlterar}>
              Alterar
            </button>
            <button
              className="btn btn-danger"
              onClick={handleRemover}
              disabled={isLoading} // Desabilita o botão enquanto a remoção está carregando
            >
              {isLoading ? "Removendo..." : "Remover"}
            </button>
          </div>
          {isError && (
            <div className="alert alert-danger mt-3">
              Ocorreu um erro ao tentar remover o produto. Tente novamente.
            </div>
          )}
        </div>
      </div>

      {/* Modal de sucesso de remoção */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Produto Removido</Modal.Title>
        </Modal.Header>
        <Modal.Body>O produto foi removido com sucesso.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProdutoDetalhesPage;

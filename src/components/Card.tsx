import React from "react";
import { useNavigate } from "react-router-dom";
import Categoria from "../interfaces/Categoria";

interface Props {
  id: number;
  imagem: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: Categoria;
  qtdEstoque: number;
  footer: React.ReactNode;
  disponivel: boolean;
  dataCadastro: Date;
}

const Card: React.FC<Props> = ({
  id,
  imagem,
  nome,
  descricao,
  preco,
  categoria,
  qtdEstoque,
  footer,
  disponivel,
  dataCadastro,
}: Props) => {
  const navigate = useNavigate();

  // Função chamada ao clicar no card para navegar para a página de detalhes do produto
  const handleClick = () => {
    const produto = {
      id,
      imagem,
      nome,
      descricao,
      preco,
      categoria,
      qtdEstoque,
      disponivel,
      dataCadastro,
    };
    console.log(produto);
    navigate(`/produto/${id}`, { state: produto });
  };

  return (
    <div className="card h-100 border-0" onClick={handleClick}>
      <img src={`/${imagem}`} className="card-img-top" alt={nome} />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{nome}</h5>
          <p className="card-text">{descricao}</p>
        </div>
        <p className="card-text fw-bold" style={{ color: "rgb(220, 53, 69)" }}>
          <strong>Preço:</strong>
          <br />
          {preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
      <div className="card-footer border-0 p-0 mb-3">{footer}</div>
    </div>
  );
};

export default Card;

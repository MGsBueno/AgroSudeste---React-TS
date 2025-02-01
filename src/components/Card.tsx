import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  imagem: string;
  titulo: string;
  descricao: string;
  preco: string;
  categoria: string;
  qtdEstoque: number;
  footer: React.ReactNode;
}

const Card: React.FC<Props> = ({
  id,
  imagem,
  titulo,
  descricao,
  preco,
  categoria,
  qtdEstoque,
  footer,
}: Props) => {
  const navigate = useNavigate();

  // Função chamada ao clicar no card para navegar para a página de detalhes do produto
  const handleClick = () => {
    const produto = {
      id,
      imagem,
      titulo,
      descricao,
      preco,
      categoria,
      qtdEstoque,
    };
    console.log(produto);
    navigate(`/produto/${id}`, { state: produto });
  };

  return (
    <div className="card h-100 border-0" onClick={handleClick}>
      <img src={`/${imagem}`} className="card-img-top" alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{descricao}</p>
        <p className="card-text fw-bold" style={{ color: "rgb(220, 53, 69)" }}>
          R$ {preco}
        </p>
      </div>
      <div className="card-footer border-0 p-0 mb-3">{footer}</div>
    </div>
  );
};

export default Card;

import { ReactNode } from "react";
import { Link } from "react-router-dom"; // Importando Link do react-router-dom

interface Props {
  id?: number;
  imagem: string; // Imagem é recebida como string (nome do arquivo)
  titulo: string;
  descricao: string;
  preco: string;
  footer: ReactNode;
}

const Card = ({ id, imagem, titulo, descricao, preco, footer }: Props) => {
  console.log(Card);
  // Definir o link para a página de detalhes do produto
  const produtoLink = id ? `/produto/${id}` : "#"; // A URL de navegação para a página do produto

  return (
    <Link to={produtoLink} className="text-decoration-none">
      {" "}
      {/* Envolvendo o card com o Link */}
      <div className="card h-100 border-0">
        {/* Exibe a imagem com caminho relativo à pasta public */}
        <img
          src={`/${imagem}`} // A imagem será carregada diretamente da pasta public
          className="card-img-top"
          alt={titulo} // Usando o título do produto como alt da imagem
        />
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text">{descricao}</p>
          <p
            className="card-text fw-bold"
            style={{ color: "rgb(220, 53, 69)" }}
          >
            R$ {preco}
          </p>
        </div>
        <div className="card-footer border-0 p-0 mb-3">{footer}</div>
      </div>
    </Link>
  );
};

export default Card;

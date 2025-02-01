import CadastroForm from "../components/CadastroForm";
import { Link } from "react-router-dom";
import agroImage from "../assets/logo.webp"; // Imagem relacionada ao tema agro

const CadastroPage = () => {
  return (
    <>
      {/* Seção de herói com imagem de fundo, usando Bootstrap */}
      <div
        className="hero-section text-white text-center py-5"
        style={{
          backgroundImage: `url(${agroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2
          className="display-4 fw-bold"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Adiciona sombra preta ao redor do texto
          }}
        >
          Bem-vindo ao Agro Sudeste!
        </h2>

        <Link to="/" className="btn btn-light btn-lg">
          Retorna à loja
        </Link>
      </div>

      {/* Conteúdo principal da página */}
      <div className="container my-5">
        <p className="fw-bold">
          Cadastre-se para comprar produtos agrícolas de qualidade.
        </p>

        {/* Formulário de cadastro com borda e sombra para destacar */}
        <div className="bg-light p-4 rounded shadow-sm">
          <CadastroForm />
        </div>
      </div>
    </>
  );
};

export default CadastroPage;

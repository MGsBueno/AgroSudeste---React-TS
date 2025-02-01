import { Link } from "react-router-dom";
import useUsuarioStore from "../store/useUsuarioStore"; // Importando a store do Zustand
import useCarrinhoStore from "../store/useCarrinhoStore"; // Importando a store do carrinho
import agro from "../assets/logo.webp";
import carrinho from "../assets/carrinho.png";

function NavBar() {
  // Pegando o usuário logado da store do Zustand
  const usuarioLogado = useUsuarioStore((state) => state.usuarioLogado);
  const setUsuarioLogado = useUsuarioStore((state) => state.setUsuarioLogado);

  // Acessando os itens do carrinho
  const itensCarrinho = useCarrinhoStore((state) => state.itens);

  // Calcula a quantidade total de itens
  const quantidadeTotal = itensCarrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  // Calcula o valor total do carrinho
  const valorTotal = itensCarrinho.reduce(
    (total, item) => total + item.produto.preco * item.quantidade,
    0
  );

  // Função de logout
  const handleLogout = () => {
    setUsuarioLogado(""); // Limpar o usuário logado
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-success "
        style={{ paddingBottom: "20px" }}
      >
        <div className="container">
          <div className="d-flex align-items-center">
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <img
                src={agro}
                alt="Logo"
                style={{ width: "60px", paddingRight: "20px" }}
                className="d-none d-md-block"
              />
              Agro Sudeste
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* Exibe o login ou o nome do usuário logado */}
              {!usuarioLogado ? (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Faça seu login!
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link">
                      não tem cadastro?{" "}
                      <Link
                        to="/cadastro"
                        className="nav-link p-0"
                        style={{ marginInline: "25px", color: "#FFD700" }}
                      >
                        Cadastre-se
                      </Link>
                    </span>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <span className="nav-link">
                    Olá, {usuarioLogado} -{" "}
                    <a href="#" className="text-white" onClick={handleLogout}>
                      Sair
                    </a>
                  </span>
                </li>
              )}

              {/* Outros links de navegação */}
              <li className="nav-item">
                <Link to="/cadastrar-produto" className="nav-link">
                  Cadastrar produto
                </Link>
              </li>
            </ul>

            {/* Carrinho e valor total à direita do menu */}
            <div className="ms-auto d-flex align-items-center">
              {/* Exibição para telas grandes */}
              <div className="d-none d-lg-block position-relative">
                <Link to="/carrinho" style={{ textDecoration: "none" }}>
                  <img
                    src={carrinho}
                    alt="Carrinho"
                    style={{ width: "55px" }}
                  />
                  {/* Exibindo a quantidade de itens no carrinho */}
                  {quantidadeTotal > 0 && (
                    <span
                      className="badge bg-danger position-absolute"
                      style={{
                        top: "-5px",
                        right: "-5px",
                        fontSize: "0.8rem",
                        padding: "5px",
                      }}
                    >
                      {quantidadeTotal}
                    </span>
                  )}
                </Link>
              </div>

              {/* Exibindo o valor total abaixo do carrinho */}
              {quantidadeTotal > 0 && (
                <div
                  className="d-none d-lg-block"
                  style={{
                    fontSize: "0.8rem",
                    color: "white",
                    marginLeft: "10px",
                  }}
                >
                  R${" "}
                  {valorTotal.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              )}

              {/* Exibição para telas pequenas */}
              <div className="d-block d-lg-none ms-3">
                <Link to="/carrinho" style={{ textDecoration: "none" }}>
                  <img
                    src={carrinho}
                    alt="Carrinho"
                    style={{ width: "40px", marginRight: "10px" }}
                  />
                  {/* Exibindo a quantidade de itens no carrinho */}
                  {quantidadeTotal > 0 && (
                    <span
                      className="badge bg-danger"
                      style={{
                        fontSize: "0.8rem",
                        padding: "5px",
                      }}
                    >
                      {quantidadeTotal}
                    </span>
                  )}
                </Link>
                {/* Exibindo o valor total para telas pequenas */}
                {quantidadeTotal > 0 && (
                  <div
                    className="d-block"
                    style={{
                      fontSize: "0.8rem",
                      color: "white",
                      marginTop: "5px",
                    }}
                  >
                    R${" "}
                    {valorTotal.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-danger" style={{ padding: "3px" }}></div>
    </>
  );
}

export default NavBar;

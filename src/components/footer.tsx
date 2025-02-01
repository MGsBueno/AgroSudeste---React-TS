import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-success text-white text-center py-3">
      <p className="mb-0">
        &copy; 2025 Agro Sudeste. Todos os direitos reservados.
      </p>
      <div>
        <Link to="/contato" className="text-white me-3">
          Contato
        </Link>
        <Link to="/sobre" className="text-white me-3">
          Sobre
        </Link>
      </div>
    </footer>
  );
}

export default Footer;

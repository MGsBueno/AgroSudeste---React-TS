import CadastroDeProdutosForm from "../components/CadastroDeProdutosForm";
import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import TabelaDeProdutos from "../components/TabelaDeProdutos";

const CadastroDeProdutosPage = () => {
  return (
    <>
      <h5>Cadastro de Produtos</h5>
      <hr className="mt-1" />
      <CadastroDeProdutosForm />

      <h5>Lista de Produtos</h5>
      <hr className="mt-1" />
      <Pesquisa />
      <TabelaDeProdutos />
      <Paginacao />
    </>
  );
};

export default CadastroDeProdutosPage;

import useProdutosComPaginacao from "../hooks/useProdutosComPaginacao";
import useProdutosStore from "../store/useProdutosStore";

const Paginacao = () => {
  const pagina = useProdutosStore((s) => s.pagina);
  const tamanho = useProdutosStore((s) => s.tamanho);
  const nome = useProdutosStore((s) => s.nome);

  const setPagina = useProdutosStore((s) => s.setPagina);

  const tratarPaginacao = (pagina: number) => {
    setPagina(pagina);
  };

  const {
    data: resultadoPaginado,
    isPending: carregandoProdutos,
    error: errorProdutos,
  } = useProdutosComPaginacao({ pagina, tamanho, nome });

  if (carregandoProdutos) return <h6>Carregando...</h6>;
  if (errorProdutos) throw errorProdutos;

  const totalDePaginas = resultadoPaginado.totalDePaginas;

  const arrayDePaginas = [];

  if (totalDePaginas < 2) return;

  for (let i = 0; i < totalDePaginas; i++) {
    arrayDePaginas.push(
      <li key={i} className={pagina === i ? "page-item active" : "page-item"}>
        <a onClick={() => tratarPaginacao(i)} className="page-link">
          {i + 1}
        </a>
      </li>
    );
  }

  return (
    <nav aria-label="Paginação de produtos">
      <ul className="pagination">
        <li className={pagina === 0 ? "page-item disabled" : "page-item"}>
          <a onClick={() => tratarPaginacao(pagina - 1)} className="page-link">
            Anterior
          </a>
        </li>
        {arrayDePaginas}
        <li
          className={
            pagina === totalDePaginas - 1 ? "page-item disabled" : "page-item"
          }
        >
          <a onClick={() => tratarPaginacao(pagina + 1)} className="page-link">
            Próxima
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Paginacao;

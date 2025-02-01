import { FormEvent, useRef } from "react";
import useProdutosStore from "../store/useProdutosStore";

const Pesquisa = () => {

  const setNome = useProdutosStore(s => s.setNome);
  const setPagina = useProdutosStore(s => s.setPagina);

  const tratarNome = (nome: string) => {
    setNome(nome);
    setPagina(0);
  }

  const nomeRef = useRef<HTMLInputElement>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    tratarNome(nomeRef.current!.value);
  }

  return (
    <form className="d-flex flex-row mb-3" onSubmit={submit}>
        <input ref={nomeRef} type="text" className="form-control form-control-sm me-3" />
        <button type="submit" className="btn btn-success btn-sm px-3">Pesquisar</button>
    </form>
  )
}
export default Pesquisa
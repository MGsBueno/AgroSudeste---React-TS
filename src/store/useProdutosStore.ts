import { create } from "zustand";
import Produto from "../interfaces/Produto";

interface ProdutosStore {
  pagina: number;
  tamanho: number;
  nome: string;
  produtoSelecionado: Produto;

  setPagina: (pagina: number) => void;
  setTamanho: (tamanho: number) => void;
  setNome: (nome: string) => void;
  setProdutoSelecionado: (produto: Produto) => void;
}

const useProdutosStore = create<ProdutosStore>((set) => ({
  pagina: 0,
  tamanho: 5,
  nome: "",
  produtoSelecionado: {} as Produto,

  setPagina: (novaPagina: number) => set(() => ({ pagina: novaPagina })),
  setTamanho: (novoTamanho: number) => set(() => ({ tamanho: novoTamanho })),
  setNome: (novoNome: string) => set(() => ({ nome: novoNome })),
  setProdutoSelecionado: (novoProdutoSelecionado: Produto) =>
    set(() => ({ produtoSelecionado: novoProdutoSelecionado })),
}));
export default useProdutosStore;

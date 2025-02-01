import { create } from "zustand";
import Produto from "../interfaces/Produto";

interface ItemStore {
  produto: Produto | null;
  quantidade: number;

  adicionarProduto: (produto: Produto) => void;
  removerProduto: () => void;
  alterarQuantidade: (quantidade: number) => void;
  carregarProduto: () => void;
}

const useItemStore = create<ItemStore>((set) => ({
  produto: null, // Inicia sem produto
  quantidade: 0,

  adicionarProduto: (produto: Produto) => {
    set({
      produto,
      quantidade: 1, // Adiciona um produto inicialmente
    });
    localStorage.setItem(
      "itemAuxiliar",
      JSON.stringify({ produto, quantidade: 1 })
    );
  },

  removerProduto: () => {
    set({
      produto: null,
      quantidade: 0,
    });
    localStorage.removeItem("itemAuxiliar"); // Remove do localStorage
  },

  alterarQuantidade: (quantidade: number) => {
    set({
      quantidade,
    });
    const produtoSalvo = localStorage.getItem("itemAuxiliar");
    if (produtoSalvo) {
      const { produto } = JSON.parse(produtoSalvo);
      localStorage.setItem(
        "itemAuxiliar",
        JSON.stringify({ produto, quantidade })
      );
    }
  },

  carregarProduto: () => {
    const produtoSalvo = localStorage.getItem("itemAuxiliar");
    if (produtoSalvo) {
      const { produto, quantidade } = JSON.parse(produtoSalvo);
      set({
        produto,
        quantidade,
      });
    }
  },
}));

export default useItemStore;

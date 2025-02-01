import { create } from "zustand";
import Produto from "../interfaces/Produto";

// Produto.ts
export default interface Produto {
  id: number; // Certifique-se de que o id é número
  nome: string;
  preco: number;
  imagem: string;
  categoria?: { id: number; nome: string };
  disponivel?: boolean;
  qtdEstoque?: number;
  dataCadastro?: Date;
}

const useCarrinhoStore = create<CarrinhoStore>((set) => ({
  itens: [],

  adicionarProduto: (produto: Produto) =>
    set((state) => {
      const itemExistente = state.itens.find(
        (item) => item.produto.id === produto.id
      );

      let novoCarrinho;
      if (itemExistente) {
        novoCarrinho = state.itens.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        novoCarrinho = [...state.itens, { produto, quantidade: 1 }];
      }

      localStorage.setItem("carrinho", JSON.stringify(novoCarrinho)); // Salva no localStorage
      return { itens: novoCarrinho };
    }),

  removerProduto: (id: number) =>
    set((state) => {
      const novoCarrinho = state.itens.filter((item) => item.produto.id !== id);
      localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
      return { itens: novoCarrinho };
    }),

  alterarQuantidade: (id: number, quantidade: number) =>
    set((state) => {
      const novoCarrinho = state.itens.map((item) =>
        item.produto.id === id ? { ...item, quantidade } : item
      );
      localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
      return { itens: novoCarrinho };
    }),

  carregarCarrinho: () => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      set(() => ({ itens: JSON.parse(carrinhoSalvo) }));
    }
  },
}));

export default useCarrinhoStore;

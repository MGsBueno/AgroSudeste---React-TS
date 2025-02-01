import { create } from "zustand";

interface UsuarioStore {
  usuarioLogado: string;
  token: string;
  tentouLogar: boolean;

  setUsuarioLogado: (usuario: string, token: string) => void;
  setTentouLogar: (valor: boolean) => void;
  carregarUsuario: () => void; // Nova função para restaurar login após F5
}

const useUsuarioStore = create<UsuarioStore>((set) => ({
  usuarioLogado: "",
  token: "",
  tentouLogar: false,

  setUsuarioLogado: (usuario: string, token: string) =>
    set(() => ({ usuarioLogado: usuario, token })),

  setTentouLogar: (valor: boolean) => set(() => ({ tentouLogar: valor })),

  carregarUsuario: () => {
    const usuario = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    if (usuario && token) {
      set(() => ({ usuarioLogado: usuario, token }));
    }
  },
}));

export default useUsuarioStore;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useUsuarioStore from "./store/useUsuarioStore";
import useCarrinhoStore from "./store/useCarrinhoStore";

// Carregar usuário e carrinho antes de renderizar
useUsuarioStore.getState().carregarUsuario();
useCarrinhoStore.getState().carregarCarrinho();

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "./Layout";
import ListaDeProdutosPage from "../pages/ListaDeProdutosPage";
import LoginPage from "../pages/LoginPage";
import CadastroPage from "../pages/CadastroPage";
import CadastroDeProdutosPage from "../pages/CadastroDeProdutosPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import ErrorPage from "../pages/ErrorPage";
import CardsDeProdutosPage from "../pages/CardsDeProdutosPage";
import PrivateRoutes from "./PrivateRoutes";
import ContatoPage from "../pages/contatoPage";
import SobrePage from "../pages/aboutPage";
import ProdutoDetalhes from "../pages/ProdutoDetalhesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
        children: [
          { path: ":nomeCategoria?", element: <CardsDeProdutosPage /> },
        ],
      },
      { path: "listar-produtos", element: <ListaDeProdutosPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "cadastro", element: <CadastroPage /> },

      { path: "sobre", element: <SobrePage /> },
      { path: "contato", element: <ContatoPage /> },
      { path: "/produto/:produtoId", element: <ProdutoDetalhes /> },
    ],
  },
  {
    path: "/",
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [
      { path: "cadastrar-produto", element: <CadastroDeProdutosPage /> },
      { path: "carrinho", element: <CarrinhoPage /> },
    ],
  },
]);
export default router;

import { Navigate, useLocation } from "react-router-dom";
import useUsuarioStore from "../store/useUsuarioStore"
import Layout from "./Layout";

const PrivateRoutes = () => {
  const usuarioLogado = useUsuarioStore(s => s.usuarioLogado);

  const location = useLocation();

  if (usuarioLogado.length === 0){
    return <Navigate to="/login" state={{from: location.pathname}} />
  }
  else {
    return <Layout />
  }
}
export default PrivateRoutes
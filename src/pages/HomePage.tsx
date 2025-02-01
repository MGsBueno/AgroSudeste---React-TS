import { NavLink, Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="row">
      <div className="col-lg-2">
        <h5>Categorias</h5>
        <div className="nav flex-column nav-pills">
          <NavLink aria-current="page" className="nav-link" to="/">
            Todos
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/Maquinarios">
            Maquinários
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/Implementos">
            Implemento
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/Insumos">
            Insumos
          </NavLink>
        </div>
      </div>
      <div className="col-lg-10">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;

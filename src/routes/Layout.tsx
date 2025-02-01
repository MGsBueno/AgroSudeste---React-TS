import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/footer";

const Layout = () => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <div className="container mt-3 flex-grow-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Layout;

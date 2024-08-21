import React, { useContext } from "react";
import "./Layout.scss";
import { AuthContext } from "../contexts/AuthContext";
import { Spinner } from "../utils/Spinner";
import { toast } from "react-toastify";
import Nav from "../Components/NavBar/Nav";
import Footer from "../Components/footer/Footer";

const Layout = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner />;
  }
  if (user) {
    return (
      <>
        <div className="private_layout">
          <header>
            <nav>
              <Nav />
            </nav>
          </header>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
        </div>
      </>
    );
  } else {
    return (
      <div className="public_layout">
        <div className="content">{children}</div>
      </div>
    );
  }
};

export default Layout;

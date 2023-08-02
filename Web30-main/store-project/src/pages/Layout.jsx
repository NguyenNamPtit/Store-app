import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <CartItem />
      <Footer />
    </>
  );
};

export default Layout;

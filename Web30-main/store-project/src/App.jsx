import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import DetailProduct from "./pages/DetailProduct";
import AdminBlog from "./auth/AdminBlog";
import Login from "./pages/Login";
import { PrivateBlog } from "./auth/PrivateBlog";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Ai xem cung duoc */}
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="product/:id" element={<DetailProduct />} />
          <Route path="about-us" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="*" element={<NoPage />} />
          <Route path="cart" element={<Cart />} />

          {/* Danh cho Admin */}
          <Route path="admin-blog" element={<PrivateBlog />} />
          {/*Login */}
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

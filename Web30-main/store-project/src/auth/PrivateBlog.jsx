import { Navigate } from "react-router-dom";
import AdminBlog from "./AdminBlog";

export const PrivateBlog = () => {
  //   const isAuth = false;
  const isAuth = localStorage.getItem("isAuth");
  if (isAuth) {
    return <AdminBlog />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CartItem = () => {
  const cart = useSelector((state) => state.cart);
  const getTotal = () => {
    let total = 0;
    cart?.forEach((item) => {
      //   console.log(item);
      total += item.quantity;
    });
    return total;
  };
  getTotal();
  console.log(getTotal());

  // chuyển hướng sang trang gỏ hàng

  const Navigate = useNavigate();
  const handleToCart = () => {
    Navigate("cart");
  };
  return (
    <div className="wrap-cart" onClick={handleToCart}>
      <AddShoppingCartIcon />
      <span className="quanlity-cart">{getTotal()}</span>
    </div>
  );
};

export default CartItem;

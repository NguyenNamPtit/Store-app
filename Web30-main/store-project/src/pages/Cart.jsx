import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { downQuantity, remove, upQuantity } from "../redux/CartSlide";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  //tổng sản phẩm

  const totalCart = () => {
    let total = 0;
    cart.forEach((item) => {
      const newprice = item.price * item.quantity;
      total += newprice;
    });
    return total;
  };

  //tổng sản phẩm

  const product = () => {
    let product = 0;
    cart.forEach((item) => {
      const newproduct = item.quantity;
      product += newproduct;
    });
    return product;
  };
  product();

  // remove
  const dispatch = useDispatch();
  const handleRemove = (item) => {
    toast.success("Xóa sản phẩm thành công");
    dispatch(remove(item));
  };

  //tăng số lượng sản phẩm

  const handleUpquantity = (item) => {
    dispatch(upQuantity(item));
  };

  // giảm số lượng
  const handleDownquantity = (item) => {
    dispatch(downQuantity(item));
  };
  return (
    <div className="cart-pages">
      <Container>
        <Row>
          <Col xs={12} sm={8} md={10}>
            <h2>Shopping Cart</h2>
            {cart?.length > 0 &&
              cart?.map((item, index) => {
                return (
                  <div key={index} className="wrap-cart-item">
                    <div className="img-cart">
                      <img src={item.image} />
                    </div>
                    <div className="content-cart">
                      <h4 className="title-cart">{item.title}</h4>
                      <p className="price"> {item.price}</p>
                      <div className="price-conter">
                        <button onClick={() => handleDownquantity(item)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleUpquantity(item)}>
                          +
                        </button>
                      </div>
                      <button
                        className="btn-remove"
                        onClick={() => handleRemove(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
          </Col>
          <Col xs={12} sm={4} md={2}>
            <h2>Oder Cart</h2>
            <p>Tổng sản phẩm:{product()}</p>
            <p>Tổng giá tiền:{totalCart()}</p>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Cart;

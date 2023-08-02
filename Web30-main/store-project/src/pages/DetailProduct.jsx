import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Star } from "feather-icons-react/build/IconComponents";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlide";

const DetailProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [rating, setRating] = useState([]);

  /*Get API*/
  useEffect(() => {
    const getApiDetail = async () => {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      setData(response.data);
    };
    getApiDetail();
  }, []);

  /*Logic hien thi rating*/
  const counterRate = Math.ceil(data?.rating?.rate); //So sao

  useEffect(() => {
    if (counterRate) {
      let start = []; //Tao 1 mang voi gai tri rong, de sau vong lap luu tru tam gia tri cua vong lap.
      for (let i = 0; i < counterRate; i++) {
        start.push(i);
      }
      setRating(...rating, start);
    }
  }, [counterRate]);

  // console.log(rating, 'rating');

  //logic giỏ hàng

  const cart = useSelector((item) => item.cart);
  console.log(cart);

  // hiển thị quantity

  const quanlityCart = () => {
    let total = 0;
    cart.forEach((item) => (total += item.quantity));
    return total;
  };

  //thêm 1 sản phẩm mới

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    console.log(data);
    dispatch(addToCart(data));
  };
  return (
    <div className="detail-product">
      <Container>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <div className="images-box">
              <img src={`${data && data.image}`} />
            </div>
          </Col>
          <Col xs={12} sm={6} md={8}>
            <div className="content-box">
              <h2 className="title-detail">{data && data.title}</h2>
              <p className="price-detail">
                <span>{data && data.old}</span> ${data && Math.ceil(data.price)}{" "}
              </p>
              <div className="rating-detail">
                {/* Rating */}
                <ul>
                  {rating.map((item, index) => {
                    return (
                      <li key={index}>
                        <Star />
                      </li>
                    );
                  })}
                </ul>

                <p className="counter-rating">
                  ({data && data.rating.count} Customer reviews)
                </p>
              </div>
              <div className="short-details">{data?.description}</div>

              <div className="buy-product">
                {/* <div className="quanlity-product">
                  <div className="name-buy-product">Quantity</div>
                  <div className="counter-product">
                    <Button variant="outline-secondary">-</Button>
                    <span>{quanlityCart()}</span>
                    <Button variant="outline-secondary">+</Button>
                  </div>
                </div> */}

                <Button variant="dark" onClick={() => handleAddToCart()}>
                  Mua sản phẩm
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailProduct;

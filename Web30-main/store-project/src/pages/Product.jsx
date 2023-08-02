import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/CartSlide";

const Product = () => {
  const [data, setData] = useState();

  useEffect(() => {
    //get API
    const getAPI = async () => {
      const response = await axios.get("http://localhost:3000/products");
      // console.log(response.data);
      setData(response.data);
    };
    getAPI();
  }, []);
  // console.log(data, 'data');
  // thuc hien them san pham vào giỏ hàng
  const dispatch = useDispatch();
  return (
    <div className="listing-product">
      <Container>
        <Row>
          {data &&
            data.map((item) => {
              // console.log(item, "item");
              return (
                <Col xs={12} sm={6} md={3} key={item.id}>
                  <Card>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                      <Link to={`/product/${item.id}`}>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                      </Link>
                      <Button
                        variant="primary
                       
                      "
                        onClick={() => dispatch(addToCart(item))}
                      >
                        Them vao gio hang
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
};

export default Product;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const Blog = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const response = await axios.get("http://localhost:3000/blogs");
      setData(response.data);
    }
    getApi();
  }, [])

  return (
    <div className='listing-blogs'>
      <Container>
        <Row>
          {data && data.map((item) => {
            return (
              <Col xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}


        </Row>
      </Container>
    </div>
  )
}

export default Blog
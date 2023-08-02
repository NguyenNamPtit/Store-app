import { Col, Container, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const isAuth = localStorage.getItem("isAuth");
  const navigateTo = useNavigate();
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("isAuth");
    toast.success("ban da dang nhap thanh cong");
    setTimeout(() => {
      navigateTo("/");
    }, 1000);
  };
  // console.log("isAu", isAuth);
  return (
    <div className="header-main">
      <Container>
        <Row>
          <Col xs={12} sm={4} md={4}>
            <div className="logo-main">
              <img src="../../public/images/logo.png" />
            </div>
          </Col>
          <Col xs={12} sm={8} md={8}>
            <Navbar id="basic-navbar-nav" className="menu-main">
              <Nav className="me-auto">
                <Nav>
                  <Link to="/">Home</Link>
                </Nav>
                <Nav>
                  <Link to="product">Product</Link>
                </Nav>
                <Nav>
                  <Link to="about-us">About</Link>
                </Nav>
                <NavDropdown title="Blogs" id="basic-nav-dropdown">
                  <p>
                    <Link to="blog">Chinh Tri</Link>
                  </p>
                  <p>
                    <Link>Xa Hoi</Link>
                  </p>
                </NavDropdown>
                <Nav>
                  {isAuth ? (
                    <Link onClick={handleLogout}>Logout</Link>
                  ) : (
                    <Link to="login">Login</Link>
                  )}
                </Nav>
              </Nav>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;

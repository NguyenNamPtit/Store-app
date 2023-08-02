import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
const Login = () => {
  /*lấy thông tin người dùng đăng kí */
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const getApi = async () => {
      const response = await axios.get("http://localhost:3000/user");
      // console.log(response);
      setInfo(response.data);
    };
    getApi();
  }, []);
  console.log(info);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  //chuyen huong trang
  const navigateTo = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    console.log(info);
    if (data?.email === info[0].email && data?.password === info[0].password) {
      // console.log("đang nha thanh cong");
      toast.success("Dang nhap thanh cong");
      localStorage.setItem("isAuth", true); // luu local storage
      setTimeout(() => {
        navigateTo("/admin-blog"); // chuyen huong trang
      }, 1000);
    } else {
      // console.log("dang nhan that bai");
      toast.error("Dang nhap that bai");
    }
  };

  /**check  user da dang nhap hay chua */
  const isAuth = localStorage.getItem("isAuth");
  if (isAuth) {
    navigateTo("/admin-blog");
  }
  return (
    <div className="pages-login">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12}>
            <h2>Login Acount</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>

                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="email"
                      placeholder="Enter email"
                    />
                  )}
                />

                {errors?.email?.type === "required" && (
                  <p className="error">Không được để trống </p>
                )}

                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>

                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true, maxLength: 10 }}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="password"
                      placeholder="Password"
                    />
                  )}
                />
                {/* {errors?.password?.type === "required" && (
                  <p className="error">Không được để trống</p>
                )} */}
                {errors?.password?.type === "maxLength" && (
                  <p className="error">Không được vượt quá 10 kí tự</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      {/*thong bao dang nhapus*/}
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
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default Login;

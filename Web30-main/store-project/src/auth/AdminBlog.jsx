import axios from 'axios';
import { Edit, Trash } from 'feather-icons-react/build/IconComponents';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

const AdminBlog = () => {
  /*Them Moi*/
  /* Khai bao hook Form */
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    //defaultValues Giup cho minh quan ly gia tri mac dinh cua cai form
    defaultValues: {
      title: "",
      description: "",
      content: ""
    }
  });
  /*onSubmit la 1 cai su kien nguoi dung gui len serve tu Form.*/
  const onSubmit = (data) => {
    /*B1: Lay du lieu nguoi dung gui len theo cac key cua du lieu API*/
    const data_submit = {
      title: data.title,
      content: data.content,
      description: data.description,
      image: ""
    }

    /*B2: Thuc hien post du lieu len tren Serve*/
    const postApi = async () => {
      try {
        await axios(
          {
            method: "post",
            url: "http://localhost:3000/blogs",
            data: data_submit
          }
        );
        getApi(); //goi lai api
        toast.success("🦄 Them du lieu thanh cong!");
      } catch (error) {
        toast.error("Them sai roi day !")
      }
      reset();
    }

    /*B3: Goi lai function postAPI*/
    postApi();
  }

  /*Sua va Xoa*/
  const [listBlog, setListBlog] = useState();
  const getApi = async () => {
    const response = await axios.get("http://localhost:3000/blogs");
    setListBlog(response.data)
  }

  useEffect(() => {
    /*Goi function getAPI trong useEffect*/
    getApi();
  }, [])

  /*Xu ly su kien xoa*/
  const handleDelete = (id) => {
    const deleteApi = async () => {
      try {
        await axios({
          method: "delete",
          url: `http://localhost:3000/blogs/${id}`
        });
        getApi(); //Goi lai api
        toast.success("Xoa thanh cong !");
      } catch (error) {
        toast.error("Xoa sai roi day !");
      }

    }
    /*Goi lai function xoa api de thuc thi function*/
    deleteApi()

  }

  return (
    <div className='admin-blogs'>
      <Container>
        <Row>
          {/* List Data - action xoa, edit */}
          <Col xs={12} sm={12} md={12}>
            <h2 className='title-admin'>Danh sach bai viet</h2>
            <Table striped bordered hover className='table-blogs'>
              <thead>
                <tr>
                  <th>#Id</th>
                  <th>Tieu de</th>
                  <th>Mo ta</th>
                  <th>Hanh dong</th>
                  <th>Hanh dong</th>
                </tr>
              </thead>
              <tbody>
                {listBlog && listBlog.map((item) => {
                  // console.log(item, 'item');
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td className='delete-action' onClick={() => handleDelete(item.id)}><Trash size={17} mr={2} /> Xoa</td>
                      <td><Edit size={17} mr={2} /> Sua</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Col>


          {/* Post Du lieu */}
          <Col xs={12} sm={12} md={12}>
            <h2 className='title-admin'>Them Bai Viet Moi</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>

                <Controller
                  name='title'
                  control={control}
                  rules={{ required: true, maxLength: 20 }}
                  render={({ field }) => (
                    <Form.Control {...field} type="text" placeholder="Add title ..." />
                  )}
                />
                {errors?.title?.type === "required" && <p className='error'>Title khong duoc de trong !</p>}
                {errors?.title?.type === "maxLength" && <p>Title Khong duoc vuot qua 20 ky tu !</p>}

              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <Form.Control {...field} as="textarea" rows={3} />
                  )}
                />

              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                <Form.Label>Content Detail</Form.Label>

                <Controller
                  name='content'
                  control={control}
                  render={({ field }) => (
                    <Form.Control {...field} as="textarea" rows={6} />
                  )}
                />

              </Form.Group>

              <Button type='submit' variant="danger">Submit</Button>
            </form>
          </Col>
        </Row>
      </Container>
      {/* Import Thong bao */}
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
      <ToastContainer />

    </div>
  )
}

export default AdminBlog
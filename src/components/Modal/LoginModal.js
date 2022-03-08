import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { API } from "../../config/server";
import Swal from "sweetalert2";

const LoginModal = (props) => {
  const { handleClose, show, regis } = props;
  const [state, dispatch] = useContext(AppContext);
  const router = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const toSwitch = () => {
    handleClose();
    regis();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify(formData);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await API.post("/login", body, config);

      // Notification
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });
      dispatch({
        type: "UPDATE_CART",
      });
      if (response.data.data.role === "Administrator") {
        handleClose();
        router.push("/transaction");
      } else {
        handleClose();
        window.location.reload();
      }
    } catch (error) {
      Swal.fire({
        text: "Login Failed !",
        icon: "error",
        confirmButtonColor: "red",
      });
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-overide"
      centered
      animation={false}
    >
      <Modal.Body>
        <Form onSubmit={handleOnSubmit}>
          <Modal.Title className="text-overide">
            <strong>Login</strong>
          </Modal.Title>
          <br />
          <Form.Group className="mb-3" controlId="Email">
            <Form.Control
              className="input-overide email"
              onChange={(e) => handleChange(e)}
              type="email"
              name="email"
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Password">
            <Form.Control
              className="input-overide password"
              type="password"
              onChange={(e) => handleChange(e)}
              name="password"
              placeholder="Password"
            />
          </Form.Group>

          <div className="d-grid gap-2 my-3">
            <Button variant="danger" className="bg-overide p-3" type="submit">
              Login
            </Button>
          </div>
          <p className="text-center">
            Don't have an account ? Click{" "}
            <span onClick={toSwitch}>
              <strong>Here</strong>
            </span>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;

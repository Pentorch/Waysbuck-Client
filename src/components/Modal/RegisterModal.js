import { useState, React } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { API } from "../../config/server";
import Swal from "sweetalert2";

const RegisterModal = (props) => {
  const { handleClose, show, login } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const toSwitch = () => {
    handleClose();
    login();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(formData);
      const response = await API.post("/register", body, config);
      console.log(response);

      // Notification
      if (response.status === 200) {
        Swal.fire({
          text: "Success create account !",
          icon: "success",
          confirmButtonColor: "red",
        }).then(handleClose);
      } else {
        Swal.fire({
          text: "Failed create account !",
          icon: "error",
          confirmButtonColor: "red",
        });
      }
    } catch (error) {
      Swal.fire({
        text: "Failed create account !",
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
        <Modal.Title className="text-overide">
          <strong>Register</strong>
        </Modal.Title>
        <br />
        <Form onSubmit={handleOnSubmit}>
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
              onChange={(e) => handleChange(e)}
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="FullName">
            <Form.Control
              className="input-overide fullname"
              onChange={(e) => handleChange(e)}
              type="text"
              name="fullname"
              placeholder="Enter Full Name"
            />
          </Form.Group>
          <div className="d-grid gap-2 my-3">
            <Button variant="danger" className="bg-overide p-3" type="submit">
              Register
            </Button>
          </div>
          <p className="text-center">
            Already have an account ? Click{" "}
            <span onClick={toSwitch}>
              <strong>Here</strong>
            </span>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;

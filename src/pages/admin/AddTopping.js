import { React, useState } from "react";
import { API } from "../../config/server";
import { useHistory } from "react-router-dom";
import { Form, Button, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import { attact, img2 } from "../../assets";

const AddTopping = () => {
  const history = useHistory();
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    price: "",
    name: "",
  });
  console.log("Preview", preview);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("price", form.price);
      formData.set("image", preview);

      console.log(form);
      const response = await API.post("/topping", formData, config);
      console.log(response);
      Swal.fire("Success", "Success Add Topping", "success");
      history.push("/addtopping");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container content-topping">
      <div className="row text-red">
        <div className="col-md-7 order-2 md-order-first">
          <h3>Topping</h3>

          <Form sm={{ order: 2 }} onSubmit={handleSubmit}>
            <Form.Group className="mt-5 mb-4">
              <Form.Control
                className="input-overide"
                name="name"
                onChange={(e) => handleChange(e)}
                placeholder="Topping Name"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                className="input-overide"
                name="price"
                type="number"
                min={0}
                onChange={(e) => handleChange(e)}
                placeholder="Price"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="formInputImage mb-5" controlId="ImageUpload">
              <Form.Label className="d-flex justify-content-between">
                <span style={{ color: "#8c8b8b" }}>Upload File</span>
                <Form.Control
                  name="image"
                  onChange={(e) => {
                    setPreview(e.target.files[0]);
                    // setImage(e.target.files[0].name);
                  }}
                  type="file"
                  hidden
                />
                <Image src={attact} style={{ width: "14px" }} />
              </Form.Label>
            </Form.Group>

            <center>
              <Form.Group className="formGroup">
                <Button
                  type="submit"
                  className="btn btn-danger "
                  style={{ width: "90%" }}
                >
                  Add Topping
                </Button>
              </Form.Group>
            </center>
          </Form>
        </div>
        <div className="col-md-5 order-1 md-order-last">
          <center>
            {preview && preview !== null ? (
              <img
                src={URL.createObjectURL(preview)}
                alt="preview"
                width="80%"
                height="550px"
              />
            ) : (
              <img
                src={img2}
                alt="preview"
                width="80%"
                height="550px"
                style={{ marginTop: "-50px" }}
              />
            )}
          </center>
        </div>
      </div>
    </div>
  );
};

export default AddTopping;

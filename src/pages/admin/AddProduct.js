// import React from "react";
// import Product from "../../components/Product/AddDataProduct";

// const AddProduct = () => {
//   const handleSubmit = (e, formData) => {
//     e.preventDefault();
//     console.log(formData);
//   };
//   return (
//     <div>
//       <Product suffix="Product" handleSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default AddProduct;

import { React, useState } from "react";
import { Image, Form, Button } from "react-bootstrap";

import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { attact, img1 } from "../../assets";
import { API } from "../../config/server";
const AddDataProduct = () => {
  const history = useHistory();

  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    price: "",
    tittle: "",
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
      formData.set("tittle", form.tittle);
      formData.set("price", form.price);
      formData.set("image", formData.image[0], formData.image[0].name);

      console.log(form);

      const response = await API.post("/product", formData, config);
      console.log(response);
      Swal.fire("Success", "Success Add Product", "success");

      history.push("/addproduct");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container content-add-product">
      <div className="row text-red">
        <div className="col-md-7">
          <h3>Product</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-5 mb-4">
              <Form.Control
                className="input-overide"
                name="tittle"
                onChange={(e) => handleChange(e)}
                placeholder="Product Name"
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
                  Add Product
                </Button>
              </Form.Group>
            </center>
          </Form>
        </div>
        <div className="col-md-5">
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
                src={img1}
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
export default AddDataProduct;

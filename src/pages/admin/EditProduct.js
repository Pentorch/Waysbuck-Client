import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";
import { API } from "../../config/server";
import { attact } from "../../assets";
import Avatar from "react-avatar";

function EditProduct() {
  const history = useHistory();
  const [product, setProduct] = useState({});

  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    tittle: "",
    price: "",
  });

  console.log("Preview", preview);
  console.log("product", form);

  const getProducts = async () => {
    try {
      const getListProduct = await API.get("/product");
      console.log("product", getListProduct);
      setProduct(getListProduct.data.data.products);
      setForm({
        ...form,
        tittle: getListProduct.data.data.tittle,
        price: getListProduct.data.data.products.price,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

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
      formData.set("image", preview);

      console.log("form", form);

      const response = await API.patch("/product", formData, config);
      console.log(response);

      history.push("/product");
    } catch (error) {
      console.log(error);
    }
  };
  const path = "http://localhost:5000/uploads/";
  return (
    <Container>
      <Row>
        <Col className="container justify-content-center md-10 content-global">
          <div className="row text-red">
            <div className="col-md-4">
              {preview && preview !== null ? (
                <img
                  src={URL.createObjectURL(preview)}
                  alt="preview"
                  className="box-image img-fluid"
                  height={"460px"}
                />
              ) : product.image ? (
                <img
                  src={path + product.image}
                  alt="preview"
                  className="box-image"
                  height={"460px"}
                />
              ) : (
                <Avatar
                  name={product.tittle}
                  size="450"
                  alt="preview"
                  className="box-image img-fluid"
                  height={"460px"}
                />
              )}
            </div>

            <div className="col-md-8">
              <h3>Update Product</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-5 mb-4">
                  <Form.Control
                    className="input-overide"
                    name="tittle"
                    value={form.tittle}
                    onChange={(e) => handleChange(e)}
                    placeholder="Tittle"
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control
                    className="input-overide"
                    name="price"
                    type="text"
                    value={form.price}
                    min={0}
                    onChange={(e) => handleChange(e)}
                    placeholder="Price"
                  ></Form.Control>
                </Form.Group>

                <Form.Group
                  className="formInputImage mb-5"
                  controlId="ImageUpload"
                >
                  <Form.Label className="d-flex justify-content-between">
                    <span style={{ color: "#8c8b8b" }}>{product.image}</span>
                    <Form.Control
                      name="image"
                      onChange={(e) => {
                        setPreview(e.target.files[0]);
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
                      Update Product
                    </Button>
                  </Form.Group>
                </center>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EditProduct;

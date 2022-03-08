import { React, useState, useContext } from "react";
import { Row, Col, Form, Button, Image, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API } from "../../config/server";
import { Bin, transaction } from "../../assets";
import { AppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
const Cart = () => {
  const router = useHistory();

  const [state, dispatch] = useContext(AppContext);
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    address: "",
    income: "",
    name: "",
    postCode: "",
  });

  const cart = state.cart;
  console.log("Carts", cart);
  console.log("attach", preview);

  const saveCart = () => {
    dispatch({
      type: "SAVE_CART",
    });
  };

  const deleteCart = (item) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });
    saveCart();
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const products = [];

      cart.map((item) => {
        const toppings = [];
        item.toppings.map((item) => toppings.push(item.id));
        products.push({ idProduct: item.id, qty: 1, toppings: toppings });
        // console.log("Product",products)
      });

      let formData = new FormData();

      if (preview === null) {
        Swal.fire({
          text: "Please input attachment !",
          icon: "error",
          confirmButtonColor: "red",
        });
      } else {
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("telephone", form.telephone);
        formData.append("postcode", form.postCode);
        formData.append("address", form.address);
        formData.append("attachment", preview);
        formData.append("income", subTotalCart);
        formData.append("products", JSON.stringify(products));

        const response = await API({
          method: "POST",
          url: "/transaction",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        console.log(response);
        dispatch({
          type: "RESET_CART",
        });
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(e) {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      order: cart,
      income: cart.subTotal,
    });
  }

  const subTotalCart = state.cart
    .map((product) => product.subTotal)
    .reduce((a, b) => a + b, 0);
  return (
    <Container>
      <Row className="justify-content-md-center content-cart-user">
        <Col md={10}>
          <h3 className="header3">My Cart</h3>
          <p className="tittlePrice">Review Your Order</p>
        </Col>
        <Col md={6}>
          <hr
            style={{
              width: "100%",
            }}
          />
          <Row>
            <div className="carts">
              {cart.length < 1 ? (
                <p>Your cart is empty.</p>
              ) : (
                cart.map((item, i) => (
                  <div key={i}>
                    <Row style={{ marginBottom: "10px" }} key={i}>
                      <Col md={2}>
                        <Image
                          src={item.product.image}
                          width={"100%"}
                          alt="img"
                          style={{ marginTop: "8px" }}
                        />
                      </Col>
                      <Col md={7}>
                        <span className="tittleProduct">
                          {item.product.tittle}
                        </span>
                        <br />

                        <span
                          className="text-brown"
                          style={{ fontSize: "14px" }}
                        >
                          Topping :{" "}
                        </span>
                        <span className="text-red" style={{ fontSize: "14px" }}>
                          {" "}
                          {item.toppings
                            .map((topping, i) => topping.name)
                            .join(", ")}
                        </span>
                      </Col>
                      <Col md={3} style={{ textAlign: "right" }}>
                        <p className="tittleProduct">
                          Rp {item.subTotal.toLocaleString()}
                        </p>
                        <img
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          src={Bin}
                          onClick={() => deleteCart(item)}
                          alt="img"
                        />
                      </Col>
                    </Row>
                  </div>
                ))
              )}
            </div>
            <Row>
              <Col md={12}>
                <hr
                  style={{
                    width: "100%",
                  }}
                />
              </Col>
              <Col md={7}>
                <hr
                  style={{
                    width: "100%",
                  }}
                />
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-red">Subtotal</div>
                    <div className="text-red">
                      Rp. {Number(subTotalCart).toLocaleString()}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-red">Qty</div>
                    <div className="text-red">{cart.length}</div>
                  </div>

                  <hr
                    style={{
                      width: "100%",
                    }}
                  />
                  <div className="d-flex justify-content-between align-items-center">
                    <strong className="text-red">Total</strong>
                    <strong className="text-red">
                      Rp. {Number(subTotalCart).toLocaleString()}
                    </strong>
                  </div>
                </div>
              </Col>
              <Col md={5} className="mt-3">
                <div className="carts-input" style={{ textAlign: "center" }}>
                  <Form.Group controlId="ImageUpload" className="mt-3">
                    <Form.Label>
                      <Form.Control
                        name="image"
                        onChange={(e) => {
                          setPreview(e.target.files[0]);
                          // setImage(e.target.files[0].name);
                        }}
                        type="file"
                        hidden
                      />

                      {preview && preview !== null ? (
                        <img
                          src={URL.createObjectURL(preview)}
                          alt="preview"
                          height="60px"
                        />
                      ) : (
                        <img
                          src={transaction}
                          alt="Attach"
                          height="60px"
                          style={{ marginBottom: "1rem" }}
                        />
                      )}
                      <br />
                      <p className="tittlePrice">Attache Of Transactions</p>
                    </Form.Label>
                  </Form.Group>
                </div>
              </Col>
            </Row>
          </Row>
        </Col>
        <Col md={4}>
          <div className="d-flex flex-column justify-content-space-beetwen mt-3">
            <div>
              <Form onSubmit={handleOnSubmit}>
                <Form.Group className="formGroup">
                  <Form.Control
                    name="name"
                    className="carts-input"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Name"
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="formGroup">
                  <Form.Control
                    name="email"
                    className="carts-input"
                    onChange={(e) => handleChange(e)}
                    type="email"
                    placeholder="Email"
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="formGroup">
                  <Form.Control
                    name="telephone"
                    className="carts-input"
                    onChange={(e) => handleChange(e)}
                    type="number"
                    placeholder="Phone"
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="formGroup">
                  <Form.Control
                    name="postCode"
                    className="carts-input"
                    onChange={(e) => handleChange(e)}
                    type="number"
                    placeholder="Post Code"
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="formGroup">
                  <Form.Control
                    name="address"
                    className="carts-input"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Address"
                    as="textarea"
                    rows={3}
                    required
                  ></Form.Control>
                </Form.Group>
                <Button
                  type="submit"
                  variant="red"
                  style={{ width: "100%" }}
                  className="btn btn-danger"
                >
                  Pay
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;

import { React, useState, useEffect, useContext } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CardTopping from "../../components/Product/CardTopping";
import { API } from "../../config/server";
import Loading from "../../components/Loading";
import PopUp from "../../components/Modal/PopUp";
const Product = () => {
  const { id } = useParams();
  const [state, dispatch] = useContext(AppContext);
  const [products, setProduct] = useState([]);
  const [message, setMessage] = useState("");
  const [toppings, setToppings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPop, setShowPop] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const responseProduct = await API("/product/" + id);
      const responseTopping = await API("/toppings");
      console.log("product", responseProduct);
      setProduct(responseProduct.data.data);
      setToppings(responseTopping.data.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
    //  fetchToppings();
  }, []);

  const [checkedToppings, setCheckedToppings] = useState({});
  const handleChange = (event) => {
    setCheckedToppings({
      ...checkedToppings,
      [event.target.id]: event.target.checked,
    });
  };

  const selectedToppingsId = [];
  for (var key in checkedToppings) {
    if (checkedToppings.hasOwnProperty(key)) {
      checkedToppings[key]
        ? selectedToppingsId.push(key)
        : selectedToppingsId.splice(key, 1);
    }
  }
  //console.log(selectedToppingsId);

  const selectedToppings = selectedToppingsId.map((selectedToppingId) =>
    toppings.find((topping) => topping.id == selectedToppingId)
  );

  //console.log(selectedToppings);
  const subTotal = selectedToppings
    .map((selectedTopping) => selectedTopping.price)
    .reduce((prev, curr) => prev + curr, products.price);
  //console.log(subTotal);

  const handleAddCart = (e) => {
    e.preventDefault();

    console.log(selectedToppingsId);
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: products.id,
        product: products,
        toppings: selectedToppings,
        initialPrice: subTotal,
        quantity: 1,
        subTotal: subTotal,
      },
    });
    dispatch({
      type: "SAVE_CART",
    });
    setShowPop(true);
    setMessage("Success added item to cart!");
    setCheckedToppings({});
  };
  return loading || !products || toppings.length < 1 ? (
    <Loading key={products.id} />
  ) : (
    <div
      key={products.id}
      className="d-block content-global mx-auto"
      style={{ width: "70%" }}
      data-aos="flip-left"
      data-aos-duration="1000"
    >
      <Row>
        <Col md={5} className="text-center">
          <Image
            src={products.image}
            width={"100%"}
            alt="product"
            style={{ borderRadius: "10px" }}
            data-aos="flip-right"
            data-aos-duration="1000"
          ></Image>
        </Col>
        <Col md={7}>
          <h1 className="text-overide">{products.tittle}</h1>
          <span className="text-overide">
            Rp {products.price.toLocaleString()}
          </span>
          <Row className="my-4">
            <h5 className="text-overide">Choose Topping</h5>
            <Row style={{ height: "300px", overflowY: "auto" }}>
              {toppings.map((topping) => (
                <Col md={3} key={topping.id}>
                  <CardTopping
                    topping={topping}
                    onChange={handleChange}
                    checked={checkedToppings[topping.id] || false}
                  />
                </Col>
              ))}
            </Row>
            <Row>
              <Col md={2}></Col>
            </Row>
            <Row className="justify-content-between my-4 text-overide">
              <Col>
                <h5>Subtotal</h5>
              </Col>
              <Col>
                <h5 className="text-end">Rp. {subTotal.toLocaleString()}</h5>
              </Col>
              <div className="d-grid gap-2 mt-3">
                <Button
                  variant="danger"
                  className="bg-overide"
                  onClick={handleAddCart}
                  style={{ width: "100%" }}
                  type="submit"
                >
                  Add to Cart
                </Button>
              </div>
            </Row>
          </Row>
        </Col>
      </Row>
      <PopUp show={showPop} hide={() => setShowPop(false)} message={message} />
    </div>
  );
};

export default Product;

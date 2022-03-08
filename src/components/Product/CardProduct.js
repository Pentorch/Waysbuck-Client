import { React, useState, useContext } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import LoginModal from "../Modal/LoginModal";
import RegisterModal from "../Modal/RegisterModal";

const CardProduct = ({ item }) => {
  const router = useHistory();
  const [state, dispatch] = useContext(AppContext);

  const [show, setShow] = useState(false);
  const [showRegis, setShowRegis] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowRegis = () => setShowRegis(true);
  const handleCloseRegis = () => setShowRegis(false);

  const handlePushToDetail = (id) => {
    if (!state.isLogin) {
      return handleShow();
    } else {
      console.log(id);
      router.push(`product/${id}`);
    }
  };
  return (
    <>
      <div style={{ width: "100%" }} data-aos="flip-up" data-aos-duration="500">
        <Row>
          <Col key={item.id} id={item.id} className="mb-4">
            <Card
              onClick={() => handlePushToDetail(item.id)}
              className="card-overide grow"
            >
              <Card.Img
                className="img-fluid"
                variant="top"
                src={item.image}
                style={{ objectFit: "cover" }}
              />
              <Card.Body>
                <h5 className="text-overide text-danger">{item.tittle} </h5>
                <p className="tittlePrice">Rp {item.price.toLocaleString()} </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <LoginModal
          show={show}
          handleClose={handleClose}
          regis={handleShowRegis}
        />
        <RegisterModal
          show={showRegis}
          handleClose={handleCloseRegis}
          login={handleShow}
        />
      </div>
    </>
  );
};

export default CardProduct;

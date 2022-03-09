import { Col, Row } from "react-bootstrap";
import CardProduct from "./CardProduct";
const CardList = ({ data, product, handleAddProduct }) => {
  return (
    <Row>
      {data.map((item, index) => (
        <Col key={index} sm={3}>
          <CardProduct
            item={item}
            Product={product}
            image={item.image}
            handleClick={handleAddProduct}
          />
        </Col>
      ))}
    </Row>
  );
};

export default CardList;

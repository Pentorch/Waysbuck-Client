import { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import { API } from "../config/server";
import CardList from "../components/Product/CardList";

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await API("/products");
      console.log(response);
      setProducts(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="container">
      <Jumbotron />
      <h1 className="text-overide text-danger mb-5 mt-4">Let's order</h1>
      <CardList data={products} />
    </div>
  );
};

export default Home;

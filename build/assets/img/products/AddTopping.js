import React from "react";
import AddDataProduct from "../../components/Product/AddDataProduct";

const AddTopping = () => {
  const handleSubmit = (e, formData) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      <AddDataProduct suffix="Topping" handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddTopping;

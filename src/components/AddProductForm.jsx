import { useState } from "react";
import styles from "./AddProductForm.module.css";
import common from '../styles/common.module.css';

const AddProductForm = () => {
  const [formData, setformData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });
  const handleChange = (e) => {
    setformData((prev) => ({
      ...prev,
      [e.target.name]: [e.target.value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Your Data Is Submitted Successfully!");
  };

  return (
    <div>
      <h2 className={common.heading}>Add New Product</h2>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <input
          className={common.formInput}
          no
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        ></input>
        <select
          className={common.formInput}
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothing">Clothing</option>
        </select>
        <input
          className={common.formInput}
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          min="0"
        ></input>
        <input
          className={common.formInput}
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
        ></input>
        <button type="submit" className={common.primaryButton}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;

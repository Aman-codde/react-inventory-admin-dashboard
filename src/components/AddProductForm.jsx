import { useState } from "react";
import styles from "./AddProductForm.module.css";

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
      <form onSubmit={handleSubmit}>
        <input
          className={styles.formEle}
          no
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        ></input>
        <br></br>
        <select
          className={styles.formEle}
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ width: "90%" }}
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothing">Clothing</option>
        </select>
        <br></br>
        <input
          className={styles.formEle}
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          min="0"
        ></input>
        <br></br>
        <input
          className={styles.formEle}
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
        ></input>
        <br></br>
        <button type="submit" className={styles.btn}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;

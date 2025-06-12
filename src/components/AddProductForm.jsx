import { useState } from "react";

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

    alert("submitted");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="formEle"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        ></input>
        <br></br>
        <select
          className="formEle"
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothing">Clothing</option>
        </select>
        <br></br>
        <input
          className="formEle"
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        ></input>
        <br></br>
        <input
          className="formEle"
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        ></input>
        <br></br>
        <button type="submit" className="btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;

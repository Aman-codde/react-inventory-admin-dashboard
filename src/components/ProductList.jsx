
import styles from './ProductList.module.css';
import common from '../styles/common.module.css';
import React, { useState, useMemo, useEffect } from "react";
import useProducts from "../hooks/useProducts";

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [productList, setProductList] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editForm, setEditForm] = useState({name: '', price: '', stock: ''});

  useEffect(() => {
    if (products) {
      setProductList(products);
    }
  }, [products]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = useMemo(() => {
    if (!productList) return [];
    return productList.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [productList, searchTerm]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [filteredProducts, sortOrder]);

  const startEditing = (product) => {
    setEditingProductId(product.id);
    setEditForm({
      name: product.name,
      price: product.price,
      stock: product.stock
    })
  }

  const handleEditChange = (e) => {
    const {name, value} = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const saveEdit = (id) => {
    if(!editForm.name || !editForm.price || !editForm.stock){
      alert("Please fill in all fields.");
      return;
    }

    setProductList((prev) => 
      prev.map((product) => 
        product.id === id 
          ? {
            ...product, 
            name: editForm.name,
            price: Number(editForm.price),
            stock: Number(editForm.stock),
          } 
          : product
      )
    );
    setEditingProductId(null);
    setEditForm({name: "", price: "", stock: ""})
  }

  const cancelEdit = () => {
    setEditingProductId(null);
    setEditForm({ name: "", price: "", stock: ""});
  }

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading products...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", textAlign: "center", color: "red" }}>Error fetching products: {error}</div>;
  }

  return (
    <div className={common.cardWrapper}>
      <h2>Inventory Products</h2>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${common.formInput} ${styles.flexGrow}`}
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className={`${common.formInput} ${styles.selectOverride}`}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <tr key={product.id}> 
                <td>
                {editingProductId === product.id ? ( 
                  <input
                    type='text'
                    name='name'
                    value={editForm.name}
                    onChange={handleEditChange}
                    className={common.formInput}
                  />
                ): (
                  product.name
                  )} 
                </td>
                <td>
                  {editingProductId === product.id ? (
                    <input
                      type='number'
                      name='price'
                      value={editForm.price}
                      onChange={handleEditChange}
                      className={common.formInput}
                    />
                  ):(
                    product.price
                  )}
                </td>
                <td>
                  {editingProductId === product.id ? (
                    <input
                      type='number'
                      name='stock'
                      value={editForm.stock}
                      onChange={handleEditChange}
                      className={common.formInput}
                    />
                  ):(
                    product.stock
                  )}
                </td>
                <td>
                  {editingProductId === product.id ? (
                    <>
                    <button
                      className={`${common.primaryButton}`}
                      onClick={() => saveEdit(product.id)}
                    >
                      Save
                    </button>
                    <button 
                      onClick={cancelEdit}
                      className={`${common.primaryButton}`}
                    >
                      Cancel
                    </button>
                    </>
                  ) : (
                  <>
                    <button
                      className={`${common.primaryButton}`}
                      onClick={() => startEditing(product)}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)}
                      className={`${common.primaryButton}`}
                    >
                      Delete
                    </button>
                  </>
                  )}
                  
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

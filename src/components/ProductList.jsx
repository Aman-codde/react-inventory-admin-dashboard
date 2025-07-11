import styles from "./ProductList.module.css";
import common from "../styles/common.module.css";
import React, { useState, useMemo, useEffect } from "react";
import useProducts from "../hooks/useProducts";

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [productList, setProductList] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", stock: "" });
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (products) {
      setProductList(products);
    }
  }, [products]);
  // Gather unique categories for the dropdown
  const categories = useMemo(() => {
    const cats = productList.map((p) => p.category).filter(Boolean);
    return ["All", ...Array.from(new Set(cats))];
  }, [productList]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = useMemo(() => {
    if (!productList) return [];

    return productList
      .filter(
        (product) =>
          selectedCategory === "All" || product.category === selectedCategory
      )
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [productList, selectedCategory, searchTerm]);

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
      stock: product.stock,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEdit = (id) => {
    if (!editForm.name || !editForm.price || !editForm.stock) {
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
    setEditForm({ name: "", price: "", stock: "" });
  };

  const cancelEdit = () => {
    setEditingProductId(null);
    setEditForm({ name: "", price: "", stock: "" });
  };
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Display 5 items per page

  // Calculate total pages
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  // Effect to reset to page 1 if filters change totalPages and currentPage is out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    } else if (totalPages === 0 && products.length > 0) {
      // Products exist but filter yields no results
      setCurrentPage(1); // Or handle as "no results found" more explicitly if needed
    }
  }, [sortedProducts, totalPages, currentPage, products.length]);

  // Calculate products for the current page
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

// Add this handler function to your component (place it near your other handlers)
 const handleTableClick = (e) => {
    const button = e.target.closest("button");
    if (!button) return;

    const action = button.dataset.action;
    const row = button.closest("tr");
    const productId = row?.dataset.id;
    const id = Number(productId); 
    const product = productList.find((p) => p.id === id);
    if (!product) return;

    switch (action) {
      case "edit":
        startEditing(product);
        break;
      case "delete":
        handleDelete(id);
        break;
      case "save":
        saveEdit(id);
        break;
      case "cancel":
        cancelEdit();
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        Error fetching products: {error}
      </div>
    );
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
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`${common.formInput} ${styles.selectOverride}`}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
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
        <tbody onClick={handleTableClick}>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <tr key={product.id} data-id={product.id}>
                <td>
                  {editingProductId === product.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className={common.formInput}
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editingProductId === product.id ? (
                    <input
                      type="number"
                      name="price"
                      value={editForm.price}
                      onChange={handleEditChange}
                      className={common.formInput}
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td>
                  {editingProductId === product.id ? (
                    <input
                      type="number"
                      name="stock"
                      value={editForm.stock}
                      onChange={handleEditChange}
                      className={common.formInput}
                    />
                  ) : (
                    product.stock
                  )}
                </td>
                <td>
                  {editingProductId === product.id ? (
                    <>
                      <button
                        className={`${common.primaryButton}`}
                        // onClick={() => saveEdit(product.id)}
                        data-action="save"
                      >
                        Save
                      </button>
                      <button
                        // onClick={cancelEdit}
                        className={`${common.primaryButton}`}
                        data-action="cancel"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={`${common.primaryButton}`}
                        data-action="edit"
                        // onClick={() => startEditing(product)}
                      >
                        Edit
                      </button>
                      <button
                        // onClick={() => handleDelete(product.id)}
                        className={`${common.primaryButton}`}
                        data-action="delete"
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
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{ marginRight: "0.5rem", padding: "0.5rem 0.75rem" }} // Adjusted padding & margin
        >
          Previous
        </button>
        <span style={{ margin: "0 0.5rem" }}>
          {" "}
          {/* Added margin for spacing */}
          Page {currentPage} of {totalPages > 0 ? totalPages : 1}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          style={{ marginLeft: "0.5rem", padding: "0.5rem 0.75rem" }} // Adjusted padding & margin
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;

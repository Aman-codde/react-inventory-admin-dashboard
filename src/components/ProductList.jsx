import React, { useState, useMemo,useEffect } from "react";
import useProducts from "../hooks/useProducts";

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [filteredProducts, sortOrder]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Display 5 items per page

  // Calculate total pages
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  // Effect to reset to page 1 if filters change totalPages and currentPage is out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    } else if (totalPages === 0 && products.length > 0) { // Products exist but filter yields no results
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

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading products...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", textAlign: "center", color: "red" }}>Error fetching products: {error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "200px" }}
      />

      <select
        style={{
          padding: "10px",
          marginBottom: "1rem",
          padding: "0.5rem",
          width: "200px",
          margin: "5px",
        }}
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>

      <h2>Inventory Products</h2>
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
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
        <span style={{ margin: "0 0.5rem" }}> {/* Added margin for spacing */}
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

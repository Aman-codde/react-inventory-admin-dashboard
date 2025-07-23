import styles from "./ProductList.module.css";
import common from "../../styles/common.module.css";
import React, { useState, useMemo, useEffect } from "react";
import useProducts from "../../hooks/useProducts";
import InventorySummaryCards from "./InventorySummaryCards";
import ProductTable from "./ProductTable";
import Pagination from "./Pagination";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";
import filterAndSortProducts from "../../utils/filterAndSortProducts";
import { exportProductsCSV } from "../../utils/exportCSV";
import toast from "react-hot-toast";

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
      toast.success("Product Deleted Successfully")
    }
  };

  const finalProducts = useMemo (() => {
    return filterAndSortProducts(productList,{
      category: selectedCategory,
      searchTerm,
      sortOrder
    })
  },[productList, selectedCategory, searchTerm, sortOrder])

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
      toast.error("Please fill in all fields.")
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
    toast.success("Product Updated Successfully");
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
  const totalPages = Math.ceil(finalProducts.length / itemsPerPage);

  // Effect to reset to page 1 if filters change totalPages and currentPage is out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    } else if (totalPages === 0 && products.length > 0) {
      // Products exist but filter yields no results
      setCurrentPage(1); // Or handle as "no results found" more explicitly if needed
    }
  }, [finalProducts, totalPages, currentPage, products.length]);

  // Calculate products for the current page
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return finalProducts.slice(startIndex, endIndex);
  }, [finalProducts, currentPage, itemsPerPage]);

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

  if(loading) return <Loading/>;

  if(error) return <ErrorMessage error={error}/>;

  return (
    <div className={common.cardWrapper}>
      <InventorySummaryCards products={productList} loading={loading}/>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${common.formInput} ${styles.flexGrow}`}
        />

        <button 
          onClick={() => exportProductsCSV(finalProducts)}
          className={common.primaryButton}
        >Export to CSV</button>

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

      <ProductTable 
        products = {paginatedProducts}
        editing = {{id: editingProductId, form: editForm, onChange: handleEditChange}}
        handlers = {{onTableClick: handleTableClick}}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={handleNextPage}
        onPrev={handlePreviousPage}
      />
    </div>
  );
};

export default ProductList;

import React from "react";
import products from "../data/products_data";


const ProductList = () => {
    return (
         <div style={{ padding: '20px' }}>
      <h2>Investment Products</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>name</th>
            <th>price ($)</th>
            <th>stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
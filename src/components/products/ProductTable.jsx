import common from "../../styles/common.module.css";
import styles from "./ProductList.module.css";

const ProductTable = ({products, editing, handlers}) => {
    const { id: editingProductId, form: editForm, onChange: handleEditChange} = editing;
    const { onTableClick: handleTableClick} = handlers
    return(
        <>
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
            {products.length > 0 ? (
                products.map((product) => (
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
                            data-action="save"
                        >
                            Save
                        </button>
                        <button
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
                        >
                            Edit
                        </button>
                        <button
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
        </>
    )
}

export default ProductTable;
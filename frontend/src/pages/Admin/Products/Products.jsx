import "./Products.css"
import { FaEdit, FaTrash } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../../contexts/ProductContext";

const Products = () => {

  const { products, getProductData, deleteProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleProductEdit = (product) => {
    navigate(`/admin/product/edit/${product._id}`, { state: { product } });
  };

  const handleProductDelete = async (id) => {
    await deleteProduct(id);
    getProductData();
  };

  useEffect(() => {
    getProductData();
  },[])

  return (
    <main className="main-content">
      <h2>All Products</h2>
      <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Ratings</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.productsData?.products?.map((product, idx) => (
            <tr key={product._id}>
              <td>{idx + 1}</td>
              <td>
                <img src={product.img} alt={product.title} width="40" />
              </td>
              <td>{product.title}</td>
              <td>{product.price}/-</td>
              <td>{product.rating}</td>
              <td>{product.category}</td>
              <td>{product.stockQty}</td>
              <td>{product.createdAt}</td>
              <td>
                <button onClick={() => handleProductEdit(product)} className="icon-btn" style={{ color:"gray" }}><FaEdit /></button>
                <button onClick={() => handleProductDelete(product._id)} className="icon-btn"><FaTrash style={{ color:"red"}}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </main>
  );
}

export default Products;

import { useLocation, useNavigate } from "react-router-dom";
import ProductForm from "../Products/ProductForm";
import { useContext } from "react";
import { ProductContext } from "../../../contexts/ProductContext";

const EditProduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { updateProduct } = useContext(ProductContext);
  const product = state?.product;

    if (!product) {
    return <p>Product data not found.</p>;
  }

  const handleEditSubmit = async (updatedData) => {
    await updateProduct(product._id, updatedData);
    navigate("/admin/products")
  };

  return <ProductForm onSubmit={handleEditSubmit} product={product} />

};

export default EditProduct;

import "./Products.css"
import { useContext, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../../contexts/ProductContext";


const ProductForm = ({ product }) => {

  const navigate = useNavigate();
  const { createProduct, updateProduct } = useContext(ProductContext);

  const [formData, setFormData] = useState({
    title: product?.title || "",
    img: null, // File
    publisher: product?.publisher || "",
    price: product?.price || "",
    originalPrice: product?.originalPrice || "",
    category: product?.category || "",
    genre: product?.genre || "",
    stockQty: product?.stockQty || "",
    rating: product?.rating || "",
    releaseDate: product?.releaseDate || "",
    aboutGame: product?.aboutGame || "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        let value = formData[key];

        if (key === "releaseDate" && value) {
        // convert "2020-06-02" → "June 2, 2020"
        value = dayjs(value).format("MMMM D, YYYY");
        }

        if (value !== null && value !== "") {
          data.append(key, value);
        }
      });

      if (product) {
        await updateProduct(product._id, data);
      } else {
        await createProduct(data);
      }
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
    }
  }


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) =>({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  return (
    <main className="main-content">
      <h2>{product ? "Edit Product" : "Create Product"}</h2>
    <form onSubmit={handleSubmit} className="product-form">

      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-input" required />
      </label>

      <label>
        Image:
        <input type="file" name="img" onChange={handleChange} className="form-input" accept="image/*" required={!product} />
      </label>

      <label>
        Publisher:
        <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} className="form-input" required />
      </label>

      <label>
        Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-input" required />
      </label>

      <label>
        Original Price:
        <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="form-input" required />
      </label>

      <label>
        Category:
        <input type="text" name="category" value={formData.category} onChange={handleChange} className="form-input" required />
      </label>

      <label>
        Genre:
        <input type="text" name="genre" value={formData.genre} onChange={handleChange} className="form-input" required />
      </label>

      <label>
        Stock Quantity:
        <input type="number" name="stockQty" value={formData.stockQty} onChange={handleChange} className="form-input" required />
      </label>

      <label>
        Rating:
        <input type="number" step="0.1" max="5" name="rating" value={formData.rating} onChange={handleChange} className="form-input" required />
      </label>

      <label>
        Release Date:
        <input type="date" name="releaseDate"   value={formData.releaseDate ? dayjs(formData.releaseDate).format("YYYY-MM-DD") : ""} onChange={handleChange} className="form-input" required />
      </label>

      <label>
        About Game:
        <textarea name="aboutGame" value={formData.aboutGame} onChange={handleChange} className="form-input" required />
      </label>

      <button type="submit" className="form-button">Save</button>
    </form>
    </main>

  );
}

export default ProductForm;

import { Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";

import RootLayout from "./Layouts/RootLayout";
import AdminLayout from "./Layouts/AdminLayout";

// Public Pages
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Category from "./pages/Category/Category";
import ProductListings from "./pages/ProductListings/ProductListings";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Checkout from "./pages/Checkout/Checkout";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import Profile from "./pages/Auth/Profile/Profile";
import UserAddress from "./pages/Profile/UserAddress";
import Contact from "./pages/Contact/Contact";
import OrderHistory from "./pages/Profile/OrderHistory";

// Admin Pages
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Products from "./pages/Admin/Products/Products";
import ProductForm from "./pages/Admin/Products/ProductForm";
import Users from "./pages/Admin/Users/Users";
import Orders from "./pages/Admin/Orders/Orders";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import EditProduct from "./pages/Admin/Products/EditProduct";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListings />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/address" element={<UserAddress />} />
          <Route path="/profile/orderHistory" element={<OrderHistory />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoute> <AdminLayout /> </ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/create" element={<ProductForm />} />
          <Route path="product/edit/:id" element={<EditProduct />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme="light"
      />
    </div>
  );
};

export default App;
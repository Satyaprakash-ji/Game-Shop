import { Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";

import Mockman from "mockman-js"
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Footer from "./components/Footer/Footer";
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

const App = () => {

  return(
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/products" element={<ProductListings />}/>
        <Route path="/products/:productId" element={<ProductDetails />}/>
        <Route path="/category" element={<Category />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/wishlist" element={<Wishlist />}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />}/>


        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/address" element={<UserAddress />}/>
        <Route path="/profile/orderHistory" element={<OrderHistory />}/>

        <Route path="/mockman" element={<Mockman />}/>
      </Routes>
      <Footer />

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
  )
}

export default App;
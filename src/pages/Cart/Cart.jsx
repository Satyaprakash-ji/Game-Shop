import { useContext } from "react";
import "./Cart.css"
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../contexts/OrderContext";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";

const Cart = () => {

  const { cart, deleteFromBasket, changeQuantity } = useContext(CartContext)
  const { loginData } = useContext(AuthContext)
  const { orderDispatch } = useContext(OrderContext)
  const navigate  = useNavigate()
  const { cartData } = cart;

  const subtotal = cartData?.map((game) => game.originalPrice * game.qty )?.reduce((acc, cur) => (acc+=cur), 0 )
  const totalQuantity = cartData?.map((game) => game.qty )?.reduce((acc, cur) => (acc+=cur), 0 )
  const discount = subtotal - cartData?.map((game) => game.price * game.qty )?.reduce((acc, cur) => (acc+=cur), 0)
  const totalAmount = subtotal - discount;


  const handleCheckout = () => {
    orderDispatch({
      type: "SET_ORDER_DETAILS",
      payload: { subtotal, discount, totalAmount, totalQuantity },
    });
    navigate("/checkout");
  }
  return( 
    <div>
      <h1 className="cart-title">YOUR CART</h1> 
      {cartData.length >= 1 ? (
        <div className="cart">
          <div className="cart-products">
            <div className="cart-products-heading">
              <table>
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData?.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <span className="delete-icon" onClick={() => deleteFromBasket(product._id, loginData.token)}><RxCross2 /></span>
                        <img src={product.img} alt={product.title} />
                        <span>{product.title}</span>
                      </td>
                      <td>₹{product.price}</td>
                      <td>
                        <div className="quantity">
                          <div className="minus" onClick={() => {if(product.qty > 1 ) changeQuantity(product._id, loginData.token, "decrement")}}>-</div>
                          <div className="number">{product?.qty ? product?.qty : "1"}</div>
                          <div className="plus" onClick={() => changeQuantity(product._id, loginData.token, "increment")}>+</div>
                        </div>
                      </td>
                      <td>₹{product.price * product?.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="cart-price">
            <h2>BSAKET TOTAL</h2>
            <div className="price-subtotal-and-discount">
              <div className="price-subtotal"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="price-discount"><span>Discount</span><span>₹{discount}</span></div>
            </div>
            <div className="price-total"><p>Total</p> <span>₹{subtotal - discount}</span></div>
            <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkeout</button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <img src="\assets\empty-cart.png" alt="" />
          <h1>You Have No Items In Your Cart.</h1>
          <p>Before proceed to checkout you must add some products to your shopping cart. <br /> You will find a lot of interesting products on our "Shop" page.</p>
          <button className="return-to-shop-btn" onClick={() => navigate("/category")}>RETURN TO SHOP</button>
        </div>
      )}
    </div>
  )
}

export default Cart;
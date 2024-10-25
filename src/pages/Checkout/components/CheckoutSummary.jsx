import { useContext } from "react";
import "./CheckoutSummary.css"
import { OrderContext } from "../../../contexts/OrderContext";
import { CartContext } from "../../../contexts/CartContext";

const CheckoutSummary = () => {

  const { cart } = useContext(CartContext)
  const { order } = useContext(OrderContext)
  const {firstName, lastName, addressLine1, addressLine2, city, state, zipCode, country, id} = order.orderAddress;
  const { subtotal, discount, totalAmount,totalQuantity } = order.priceDetails;
  const { cartData } = cart

  return (
    <div className="checkout-summary-div">
      <h2 className="checkout-page-summary-heading">Order Details</h2>
      <ul className="checkout-page-summary-list">
        <li className="checkout-page-order-details-subheading">
          <span>Item</span>
          <span>Qty</span>
        </li>
        {cartData?.map((game) => (
          <li>
            <span className="checkout-page-order-details-book-title">
              {game.title}
            </span>
            <span>{game.qty}</span>
          </li>
        ))}
      </ul>
      <hr />
      <h2 className="checkout-page-summary-heading">Price Details</h2>
      <ul className="checkout-page-summary-list">
        <li>
          <span>Price:</span>
          <span>({totalQuantity} items)</span>
          <span>Rs. {subtotal}</span>
        </li>
        <li>
          <span>Discount:</span>
          <span>Rs. {discount}</span>
        </li>
        <li className="checkout-page-summary-total-amount">
          <span>Total Amount:</span>
          <span>Rs. {totalAmount}</span>
        </li>
      </ul>
      <hr />
      <h2 className="checkout-page-summary-heading">Delivery Address</h2>
      <ul className="checkout-page-summary-list">
          {id ? <div>
            Name: {firstName} {lastName} <br /> Address: {addressLine1}, {addressLine2}{" "}
            <br /> City: {city} <br /> State: {state} <br /> Zip Code: {zipCode}{" "}
            <br /> Country: {country}
          </div> : <p>Please select an Address</p>}
      </ul>
      <p className="checkout-page-summary-savings">
        You will save Rs. {discount} on this order.
      </p>
      <button className="checkout-page-summary-place-order-btn">
        Place Order
      </button>
    </div>
  );
};

export default CheckoutSummary;

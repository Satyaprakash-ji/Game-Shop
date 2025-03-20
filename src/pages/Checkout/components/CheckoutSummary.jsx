import { useContext } from "react";
import "./CheckoutSummary.css"
import { OrderContext } from "../../../contexts/OrderContext";
import { CartContext } from "../../../contexts/CartContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const CheckoutSummary = () => {

  const { cart } = useContext(CartContext)
  const { order } = useContext(OrderContext)
  const {firstName, lastName, addressLine1, addressLine2, city, state, zipCode, country, id} = order.orderAddress;
  const { subtotal, discount, totalAmount,totalQuantity } = order.priceDetails;
  const { cartData } = cart

  const { loginData } = useContext(AuthContext)
  const navigate = useNavigate();
  const { orderDispatch } = useContext(OrderContext)


  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay SDK failed to load, check you internet connection");
      // console.error("Razorpay SDK failed to load, check you internet connection");
      return;
    }
    const options = {
      key: "rzp_test_CjKQwVjmROQKYy",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Game Shop",
      description: "Thank you for shopping with us",
      image:
        "https://i.pinimg.com/originals/77/24/69/772469e807964c438437fc1679f394a1.jpg",
      handler: function (response) {
        const orderData = {
          orderProducts: [...cartData],
          amount: totalAmount,
          deliveryAddress: order.orderAddress,
          paymentId: response.razorpay_payment_id,
          userEmail: loginData?.user?.email,
        };
        orderDispatch({
          type: "SET_ORDER_HISTORY",
          payload: orderData,
        });
        toast.success(`Payment of ₹${totalAmount} is Succesful !`);
        // clearCartItems(productDispatch, productState);
        navigate("/profile/orderHistory");
      },
      prefill: {
        name: `${loginData?.user?.firstName} ${loginData?.user?.lastName}`,
        email: loginData?.user?.email,
        contact: "9876543210",
      },
      theme: {
        color: "#FF7200",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const placeOrderHandler = () => {
    if (totalAmount === 0) {
      toast.error("Please add products to the cart!");
      console.error("Please add products to the cart!");
      navigate("/products");
    } else {
      displayRazorpay();
    }
  };
  
  
  

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
          <span>₹{subtotal}</span>
        </li>
        <li>
          <span>Discount:</span>
          <span>₹{discount}</span>
        </li>
        <li className="checkout-page-summary-total-amount">
          <span>Total Amount:</span>
          <span>₹{totalAmount}</span>
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
        You will save ₹{discount} on this order.
      </p>
      <button className="checkout-page-summary-place-order-btn" onClick={() => {
        if(order.orderAddress.length === 0){
          alert("Please select address!")
        }else{
          placeOrderHandler();
        }
      }}> 
        Place Order
      </button>
    </div>
  );
};

export default CheckoutSummary;

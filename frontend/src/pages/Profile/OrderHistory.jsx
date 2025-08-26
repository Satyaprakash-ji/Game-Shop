import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.css";
import { OrderContext } from "../../contexts/OrderContext";
import Loader from "../../components/Loader/Loader";

const OrderHistory = () => {
  const navigate = useNavigate();
  const { order, isLoading } = useContext(OrderContext);

  const { orderHistory } = order;
  const orderList = Array.isArray(orderHistory) ? orderHistory : [orderHistory];

  if (isLoading) {
    return <Loader />
  }
  
  return (
    <div className="order-history">
      <h1 className="order-title">YOUR ORDERS</h1>
      {orderList.length === 0 ? (
        <>
          <h3>Look's like your order is empty!</h3>
          <button className="return-to-shop-btn" onClick={() => navigate("/category")}>RETURN TO SHOP</button>
        </>
      ) : (
        orderList?.map(
          ({ orderId, totalAmount, deliveryAddress, products }) => {
            return (
              <div className="order-history-main">
                <div className="order-history-left">
                  <h3>Order Confirmed!</h3>
                  <p>
                    <strong>Order Id: </strong>
                    {orderId}
                  </p>
                  <p>
                    <strong>Total Amount: </strong>
                    {totalAmount}
                  </p>
                  <p>
                    <strong>Order will be delivered to: </strong>
                    <p>
                      {deliveryAddress?.addressLine1}, {deliveryAddress?.addressLine2},{" "}
                    </p>
                    <p>
                      {deliveryAddress?.city}, {deliveryAddress?.state}
                    </p>
                    <p>
                      Pincode: {deliveryAddress?.zipCode},{" "}
                      {deliveryAddress?.country}
                    </p>
                    <p>Phone Number: {deliveryAddress?.mobileNumber}</p>
                  </p>
                </div>
                <div className="order-history-right">
                  {products?.map(({ product, qty }) => (
                    <div className="order-history-right-card">
                      <img src={product.img} alt={product.title} />
                      <div>
                        <h4>
                          {product.title.length > 50
                            ? product.title.substring(0, 50) + "..."
                            : product.title}
                        </h4>
                        <small>Quantity: {qty}</small>
                        <p>Price: ₹{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        )
      )}
    </div>
  );
};

export default OrderHistory;

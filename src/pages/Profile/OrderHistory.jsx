import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.css";
import { AuthContext } from "../../contexts/AuthContext";
import { OrderContext } from "../../contexts/OrderContext";

const OrderHistory = () => {
  const navigate = useNavigate();
  const { order } = useContext(OrderContext);
  const { loginData } = useContext(AuthContext);

  const { orderHistory } = order;

  const orderHistoryData =
    orderHistory &&
    loginData?.user &&
    orderHistory?.filter(
      ({ userEmail }) => userEmail === loginData?.user?.email
    );
  return (
    <div className="order-history">
      {orderHistoryData.length === 0 ? (
        <>
          <h3>Look's like your order is empty!</h3>
          <button className="return-to-shop-btn" onClick={() => navigate("/category")}>RETURN TO SHOP</button>
        </>
      ) : (
        orderHistoryData?.map(
          ({ paymentId, amount, deliveryAddress, orderProducts }) => {
            return (
              <div className="order-history-main">
                <div className="order-history-left">
                  <h3>Order Confirmed!</h3>
                  <p>
                    <strong>Payment Id: </strong>
                    {paymentId}
                  </p>
                  <p>
                    <strong>Total Amount: </strong>
                    {amount}
                  </p>
                  <p>
                    <strong>Order will be delivered to: </strong>
                    <p>{loginData?.user?.email}</p>
                    {/* <p>
                      {deliveryAddress?.houseNumber}, {deliveryAddress?.city},{" "}
                      {deliveryAddress?.state}
                    </p>
                    <p>
                      Pincode: {deliveryAddress?.pincode},{" "}
                      {deliveryAddress?.country}
                    </p> */}
                    <p>Phone Number: {deliveryAddress?.mobileNumber}</p>
                  </p>
                </div>
                <div className="order-history-right">
                  {orderProducts?.map(({ title, img, price, qty }) => (
                    <div className="order-history-right-card">
                      <img src={img} alt={title} />
                      <div>
                        <h4>
                          {title.length > 50
                            ? title.substring(0, 50) + "..."
                            : title}
                        </h4>
                        <small>Quantity: {qty}</small>
                        <p>Price: ₹{price}</p>
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

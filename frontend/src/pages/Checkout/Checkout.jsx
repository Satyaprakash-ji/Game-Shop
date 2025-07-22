import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import CheckoutSummary from "./components/CheckoutSummary";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { OrderContext } from "../../contexts/OrderContext";

const Checkout = () => {
  const { loginData } = useContext(AuthContext);
  const { order, orderDispatch } = useContext(OrderContext);
  const navigate = useNavigate();

  const handleAddressSelection = (addressSelected) => {
    orderDispatch({
      type: "SET_ORDER_ADDRESS",
      payload: { ...addressSelected },
    });
  };

  const addresses = loginData?.user?.userAddresses || [];

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-main-container">
        <div className="address-container">
          <h2>Select Address</h2>

          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div key={address._id} className="address-item-div">
                <label>
                  <input
                    type="radio"
                    name="address-radio"
                    checked={order.orderAddress?._id === address._id}
                    onChange={() => handleAddressSelection(address)}
                  />
                  <div>
                    <strong>
                      {address.firstName} {address.lastName}
                    </strong>
                    <p>
                      {address.addressLine1}, {address.addressLine2}
                    </p>
                    <p>
                      {address.city}, {address.state}, {address.zipCode}
                    </p>
                    <p>{address.country}</p>
                  </div>
                </label>
              </div>
            ))
          ) : (
            <p>No Addresses Added</p>
          )}

          <button
            className="add-and-edit-address-button"
            onClick={() => navigate("/profile/address")}
          >
            Add/Edit Address
          </button>
        </div>

        <div className="order-details-container">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import { useContext, useState } from "react";
import "./UserAddress.css";
import { AuthContext } from "../../contexts/AuthContext";
import AddressForm from "./Components/AddressForm";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router";

const UserAddress = () => {
  const { loginData, handleAddAddress, editAddress, deleteAddress } =
    useContext(AuthContext);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const navigate = useNavigate();

  const handleEditAddress = (address) => {
    const updatedAddresses = loginData.user.userAddresses.map((addr) => {
      if (addr.id === editingAddressId) {
        return {
          ...addr,
          ...address,
        };
      }
      return addr;
    });

    editAddress(updatedAddresses);

    setEditingAddressId(null);
  };

  const handleCancelEdit = () => {
    setEditingAddressId(null);
  };

  return (
    <div className="user-addresses-page">
      <h2>User Addresses</h2>
      <button className="go-back-btn flex-center" onClick={() => navigate(-1)}>
        <AiOutlineArrowLeft size={20} /> Go Back
      </button>
      {loginData.user && loginData.user.userAddresses && loginData.user.userAddresses.length > 0 ? (
        loginData.user.userAddresses.map((address) => (
        <div key={address._id}>
          <h3>
            {address.firstName} {address.lastName}
          </h3>
          <p>Mobile Number: {address.mobileNumber}</p>
          <p>Address Line 1: {address.addressLine1}</p>
          <p>Address Line 2: {address.addressLine2}</p>
          <p>City: {address.city}</p>
          <p>State: {address.state}</p>
          <p>Zip Code: {address.zipCode}</p>
          <p>Country: {address.country}</p>
          {editingAddressId === address.id ? (
            <div>
              <AddressForm onSubmit={handleEditAddress} address={address} />
              <button onClick={handleCancelEdit} className="cancel-button">
                Cancel
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setEditingAddressId(address.id)}
                className="edit-button"
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => deleteAddress(address.id)}
              >
                Delete Address
              </button>
            </>
          )}
          <hr />
        </div>
      ))
    ) : (
      <p>No addresses found.</p>
    )}
      <h3>Add Address</h3>
      <AddressForm onSubmit={handleAddAddress} />
    </div>
  );
}

export default UserAddress;

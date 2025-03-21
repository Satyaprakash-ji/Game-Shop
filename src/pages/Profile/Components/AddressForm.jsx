import { useState } from "react";

function AddressForm({ onSubmit, address }) {
  const [formData, setFormData] = useState({
    firstName: address?.firstName || "",
    lastName: address?.lastName || "",
    mobileNumber: address?.mobileNumber || "",
    addressLine1: address?.addressLine1 || "",
    addressLine2: address?.addressLine2 || "",
    city: address?.city || "",
    state: address?.state || "",
    zipCode: address?.zipCode || "",
    country: address?.country || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedFormData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = formData[key].trim();
      return acc;
    }, {});

    const isEmptyField = Object.values(trimmedFormData).some(
      (value) => value === ""
    );

    if (isEmptyField) {
      console.info("Fill all the form data to add an Address");
      return;
    }

    onSubmit(formData);
    setFormData({
      firstName: "",
      lastName: "",
      mobileNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <label className="form-label">
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-input" required />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-input" required />
      </label>
      <label>
        Mobile Number:
        <input type="number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="form-input" required />
      </label>
      <label>
        Address Line 1:
        <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} className="form-input" required />
      </label>
      <label>
        Address Line 2:
        <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} className="form-input" required />
      </label>
      <label>
        City:
        <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-input" required />
      </label>
      <label>
        State:
        <input type="text" name="state" value={formData.state} onChange={handleChange} className="form-input" required />
      </label>
      <label>
        Zip Code:
        <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="form-input" required />
      </label>
      <label>
        Country:
        <input type="text" name="country" value={formData.country} onChange={handleChange} className="form-input" required />
      </label>
      <button type="submit" className="form-button">
        Save
      </button>
    </form>
  );
}

export default AddressForm;

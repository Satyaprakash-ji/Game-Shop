import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {


  const [loginData, setLoginData] = useState({
    user: null,
    isLoggedIn: null,
    isError: null,
  });

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await axios.get("/api/v1/user/me", {
        withCredentials: true,
      });

      const { user } = response.data;

      setLoginData({
        user,
        isLoggedIn: true,
        isError: null,
      });

    } catch (error) {
      setLoginData({
        user: null,
        isLoggedIn: false,
        isError: null,
      });
      console.log(error)
    }
  };

  checkAuth();
}, []);

  const logIn = async (email, password) => {
    try {
      const response = await axios.post(
        "/api/v1/user/login",
        { email, password },
        { withCredentials: true }
      );
      const { foundUser } = response.data;
      
      setLoginData({
        user: foundUser,
        isLoggedIn: true,
        isError: null,
      });

      toast.success("Logged In!");

    } catch (err) {
      setLoginData({
        ...loginData,
        isError: err.response.data.errors[0],
        isLoggedIn: false,
      });

      toast.error(`${err.response.data.errors[0]}`);
    }
  }

  const signUp = async (firstName, lastName, email, password, confirmPassword) => {
    try {
      const response = await axios.post("/api/v1/user/register", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        role: "user"
      },
      { withCredentials: true }
    );
      const { createdUser } = response.data;

      setLoginData({
        user: createdUser,
        isLoggedIn: true,
        isError: null,
      });

      toast.success("Successfully Signed Up!");

    } catch (error) {
      setLoginData({
        ...loginData,
        isError: error.response.data.errors[0],
        isLoggedIn: false,
      });

      toast.error(`${error.response.data.errors[0]}`);
    }
  }

  const logOut = async () => {
    try {
      await axios.post("/api/v1/user/logout", {}, { withCredentials: true });
      setLoginData({
      user: null,
      isLoggedIn: false,
      isError: null,
    });

    toast.success("Log Out!");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      console.error(error);
    }
  };

const handleAddAddress = async (addressToAdd) => {
  try {
    const response = await axios.post(
      "/api/v1/user/address",
      addressToAdd,
      { withCredentials: true }
    );

    const { userAddresses } = response.data;

    setLoginData((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        userAddresses: userAddresses,
      },
    }));

    toast.success("Address added successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to add address");
  }
};

  const editAddress = async (updatedAddress) => {
    try {
      const response = await axios.put(
        `/api/v1/user/address/${updatedAddress._id}`,
        updatedAddress,
        { withCredentials: true }
      );

      const { userAddresses } = response.data;

      setLoginData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          userAddresses,
        },
      }));

      toast.success("Address updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update address");
    }
  };

    const deleteAddress = async (addressIdToDelete) => {
    try {
      await axios.delete(`/api/v1/user/address/${addressIdToDelete}`, {
        withCredentials: true,
      });

      // Update frontend state
      const updatedAddresses = loginData.user.userAddresses.filter(
        (addr) => addr.id !== addressIdToDelete
      );

      setLoginData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          userAddresses: updatedAddresses,
        },
      }));

      toast.success("Address deleted!");
    } catch (error) {
      console.error("Failed to delete address:", error);
      toast.error("Failed to delete address. Please try again.");
    }
  };

    return(
        <AuthContext.Provider value={{loginData, setLoginData, signUp, logIn, logOut, handleAddAddress, editAddress, deleteAddress}}>
            {children}
        </AuthContext.Provider>
    )
}
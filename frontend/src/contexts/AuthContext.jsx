import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [ isLoading, setIsLoading ] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [ allUsers, setAllUsers ] = useState([]);

  const [loginData, setLoginData] = useState({
    user: null,
    isLoggedIn: false,
    isError: null,
    role: null,
  });

  useEffect(() => {
  const checkAuth = () => {
    setAuthLoading(true);

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setLoginData({
        user,
        isLoggedIn: true,
        isError: null,
        role: user.role,
      });
    } else {
      setLoginData({
        user: null,
        isLoggedIn: false,
        isError: null,
        role: null,
      });
    }

    setAuthLoading(false);
  };

  checkAuth();
}, []);

  const logIn = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/v1/user/login",
        { email, password },
      );
      const { foundUser } = response.data;
      
      localStorage.setItem("user", JSON.stringify(foundUser));
      setLoginData({
        user: foundUser,
        isLoggedIn: true,
        isError: null,
        role: foundUser.role,
      });

      toast.success("Logged In!");
      setIsLoading(false);
    } catch (err) {
      setLoginData({
        ...loginData,
        isError: err.response.data.errors[0],
        isLoggedIn: false,
        role: null,
      });

      toast.error(`${err.response.data.errors[0]}`);
      setIsLoading(false);
    }
  }

  const signUp = async (firstName, lastName, email, password, confirmPassword) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/v1/user/register", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        role: "user"
      },
    );
      const { createdUser } = response.data;

      setLoginData({
        user: createdUser,
        isLoggedIn: true,
        isError: null,
        role: createdUser.role,
      });

      toast.success("Successfully Signed Up!");
      setIsLoading(false);
    } catch (error) {
      setLoginData({
        ...loginData,
        isError: error.response.data.errors[0],
        isLoggedIn: false,
        role: null,
      });

      toast.error(`${error.response.data.errors[0]}`);
      setIsLoading(false);
    }
  }

  const logOut = async () => {
    try {
      localStorage.removeItem("user");
      await axiosInstance.post("/api/v1/user/logout", {});
      setLoginData({
      user: null,
      isLoggedIn: false,
      isError: null,
      role: null,
    });

    toast.success("Log Out!");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      console.error(error);
    }
  };

    const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get("/api/v1/user/all-users");
      setAllUsers(data.users);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch users");
      console.error("Error fetching users:", error);
      setIsLoading(false);
    }
  };

const handleAddAddress = async (addressToAdd) => {
  setIsLoading(true);
  try {
    const response = await axiosInstance.post(
      "/api/v1/user/address",
      addressToAdd,
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
    setIsLoading(false);
  } catch (error) {
    console.error(error);
    toast.error("Failed to add address");
    setIsLoading(false);
  }
};

  const editAddress = async (updatedAddress) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(
        `/api/v1/user/address/${updatedAddress._id}`,
        updatedAddress,
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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update address");
      setIsLoading(false);
    }
  };

    const deleteAddress = async (addressIdToDelete) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/api/v1/user/address/${addressIdToDelete}`, {} );

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
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to delete address:", error);
      toast.error("Failed to delete address. Please try again.");
      setIsLoading(false);
    }
  };

    return(
        <AuthContext.Provider value={{loginData, setLoginData, signUp, logIn, logOut, handleAddAddress, editAddress, deleteAddress, isLoading, getAllUsers, allUsers, authLoading}}>
            {children}
        </AuthContext.Provider>
    )
}
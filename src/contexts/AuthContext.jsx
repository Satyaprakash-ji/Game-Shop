import axios from "axios";
import { createContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const localStorageToken = JSON.parse(localStorage.getItem("token"));
  const localStorageUser = JSON.parse(localStorage.getItem("user"));

  const [loginData, setLoginData] = useState({
    token: localStorageToken?.token,
    user: localStorageUser?.user,
    isLoggedIn: !!localStorageUser?.user,
    isError: null,
  });

  const logIn = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });
      const { foundUser, encodedToken } = response.data;

      setLoginData({
        token: encodedToken,
        user: foundUser,
        isLoggedIn: true,
        isError: null,
      });

      console.log("Logged In!");

      localStorage.setItem("token", JSON.stringify({ token: encodedToken }));
      localStorage.setItem("user", JSON.stringify({ user: foundUser }));
    } catch (err) {
      setLoginData({
        ...loginData,
        isError: err.response.data.errors[0],
        isLoggedIn: false,
      });

      console.log(`${err.response.data.errors[0]}`);
    }
  }

  const signUp = async (email, password, firstName, lastName) => {
    try {
      const response = await axios.post("/api/auth/signup", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      });
      const { createdUser, encodedToken } = response.data;

      setLoginData({
        token: encodedToken,
        user: createdUser,
        isLoggedIn: true,
        isError: null,
      });

      console.log("Successfully Signed Up!");

      localStorage.setItem("token", JSON.stringify({ token: encodedToken }));
      localStorage.setItem("user", JSON.stringify({ user: createdUser }));
    } catch (err) {
      console.log(err);
      setLoginData({
        ...loginData,
        isError: err.response.data.errors[0],
        isLoggedIn: false,
      });

      console.log(`${err.response.data.errors[0]}`);
    }
  }

  const logOut = () => {
    setLoginData({
      token: null,
      user: null,
      isLoggedIn: false,
      isError: null,
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    console.log("Log Out!");
  }

  const handleAddAddress = (addressToAdd) => {
    const updatedAddresses = loginData?.user?.userAddresses
      ? [...loginData?.user?.userAddresses, { ...addressToAdd, id: uuid() }]
      : [{ ...addressToAdd, id: uuid() }];

    setLoginData({
      ...loginData,
      user: {
        ...loginData.user,
        userAddresses: updatedAddresses,
      },
    });

    console.log("Address Added!");

    localStorage.setItem(
      "user",
      JSON.stringify({
        user: { ...loginData.user, userAddresses: updatedAddresses },
      })
    );
  }

  const editAddress = (updatedAddresses) => {
    setLoginData({
      ...loginData,
      user: {
        ...loginData.user,
        userAddresses: updatedAddresses,
      },
    });

    console.log("Address Updated!");

    localStorage.setItem(
      "user",
      JSON.stringify({
        user: { ...loginData.user, userAddresses: updatedAddresses },
      })
    );
  }

  const deleteAddress = (addressIdToDelete) => {
    const updatedAddresses = loginData.user.userAddresses.filter(
      (addr) => addr.id !== addressIdToDelete
    );

    setLoginData({
      ...loginData,
      user: {
        ...loginData.user,
        userAddresses: updatedAddresses,
      },
    });

    console.log("Address Deleted!");

    localStorage.setItem(
      "user",
      JSON.stringify({
        user: { ...loginData.user, userAddresses: updatedAddresses },
      })
    );
  }

    return(
        <AuthContext.Provider value={{loginData, setLoginData, signUp, logIn, logOut, handleAddAddress, editAddress, deleteAddress}}>
            {children}
        </AuthContext.Provider>
    )
}
import { createContext, useContext, useReducer, useEffect, useState } from "react"
import { initialWishlist, wishlistReducer } from "../reducers/wishlistReducer"
import { AuthContext } from "./AuthContext"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axiosInstance from "../utils/axiosInstance"

export const WishlistContext = createContext()
export const WishlistDispatchContext = createContext()

export const WishlistProvider = ({children}) => {

  const [wishlist, wishlistDispatch] = useReducer(wishlistReducer, initialWishlist)
  const [isLoading, setIsLoading] = useState(true);
  const { loginData } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const getWishlistData = async () => {
    setIsLoading(true);
      try {
        const response = await axiosInstance.get("/api/v1/wishlist", {} );
        const { status, data: { wishlist } } = response;
  
        if (status === 200) {
          wishlistDispatch({ type: "ALL_WISHLIST", payload: wishlist });
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        setIsLoading(false);
      } 
  };

  useEffect(() => {
    if (loginData?.isLoggedIn) {
      getWishlistData();
    } else {
      wishlistDispatch({ type: "ALL_WISHLIST", payload: [] }); // Clear wishlist on logout
    }
  }, [loginData?.isLoggedIn]);

  const addToWishlistHandler = async (product) => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post(
            "/api/v1/wishlist/add",
            { productId: product._id },
          );
        const { status, data: { wishlist } } = response;
  
        if (status === 201) {
          wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: wishlist });
          toast.success(`"${product.title}" successfully added to Wishlist`);
        }
        setIsLoading(false);
      } catch (error) {
        navigate('/login', {state:{from :location}})
        toast.error(`Failed to Add "${product.title}" to Wishlist`,error);
        setIsLoading(false);
      } 
  };

  const deleteFromWishlist = async (productId) => {
      try {
        const response = await axiosInstance.delete(`/api/v1/wishlist/${productId}`, {
        });
        const { status, data: { wishlist } } = response;
  
        if (status === 200) {
          wishlistDispatch({ type: "DELETE_FROM_WISHLIST", payload: wishlist });
          toast.success(`Successfully removed an item from the Wishlist`);
        }
      } catch (error) {
        toast.error(`Failed to remove an item from the Wishlist`,error);
      }
  };

  const isItemInWishlist = (prodId)=>{
      return wishlist?.wishlistData.find(item=> item._id === prodId)?true:false
  }
  
  return(
      <WishlistContext.Provider value={{wishlist, addToWishlistHandler, deleteFromWishlist, isItemInWishlist, isLoading}}>
          <WishlistDispatchContext.Provider value={{wishlistDispatch}}>
              {children}
          </WishlistDispatchContext.Provider>
      </WishlistContext.Provider>
  )
}
import { createContext, useContext, useReducer, useEffect } from "react"
import { initialWishlist, wishlistReducer } from "../reducers/wishlistReducer"
import axios from "axios"
import { AuthContext } from "./AuthContext"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const WishlistContext = createContext()
export const WishlistDispatchContext = createContext()

export const WishlistProvider = ({children}) => {

    const [wishlist, wishlistDispatch] = useReducer(wishlistReducer, initialWishlist)
    const { loginData } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const getWishlistData = async () => {
        try {
          const response = await axios.get("/api/user/wishlist", {
            headers: { authorization: loginData.token },
          });
          const {
            status,
            data: { wishlist },
          } = response;
    
          if (status === 200) {
            wishlistDispatch({ type: "ALL_WISHLIST", payload: wishlist });
          }
        } catch (error) {
        } 
    };

    const addToWishlistHandler = async (product) => {
        try {
          if (!loginData.token){
            navigate('/login', {state:{from :location}})
            }
          else {
            const response = await axios.post(
                "/api/user/wishlist",
                { product },
                { headers: { authorization: loginData.token } }
              );
            const {
              status,
              data: { wishlist },
            } = response;
    
            if (status === 201) {
              wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: wishlist });
              toast.success(`"${product.title}" successfully added to Wishlist`);
            }
          }
        } catch (error) {
          navigate('/login', {state:{from :location}})
          toast.error(`Failed to Add "${product.title}" to Wishlist`);
        } 
    };

    const deleteFromWishlist = async (productId) => {
        try {
          const response = await axios.delete(`/api/user/wishlist/${productId}`, {
            headers: {
              authorization: loginData.token,
            },
          });
          const {
            status,
            data: { wishlist },
          } = response;
    
          if (status === 200) {
            wishlistDispatch({ type: "DELETE_FROM_WISHLIST", payload: wishlist });
            toast.success(`Successfully removed an item from the Wishlist`);
          }
        } catch (error) {
          toast.error(`Failed to remove an item from the Wishlist`);
        }
    };

    const isItemInWishlist = (prodId)=>{
        return wishlist?.wishlistData.find(item=> item._id === prodId)?true:false
    }

    useEffect(() => {
        if(loginData?.token)
        getWishlistData();
      }, [loginData?.token]);
    
    return(
        <WishlistContext.Provider value={{wishlist, addToWishlistHandler, deleteFromWishlist, isItemInWishlist}}>
            <WishlistDispatchContext.Provider value={{wishlistDispatch}}>
                {children}
            </WishlistDispatchContext.Provider>
        </WishlistContext.Provider>
    )
}
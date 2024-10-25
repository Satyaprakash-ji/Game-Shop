export const initialWishlist = {
    wishlistData: []
}

export const wishlistReducer = (state, {type, payload}) =>{
    switch(type){
        case "ALL_WISHLIST":
            return { ...state, wishlistData: payload };
        case "ADD_TO_WISHLIST":
            return { ...state, wishlistData: payload };
        case "DELETE_FROM_WISHLIST":
            return { ...state, wishlistData: payload }
        default:
            console.log("somthing is wrong in wishlist reducer function");
            break;
    }
}
export const wishlistReducer = (state, { type, payload }) => {
  switch (type) {
		case "EXISTING_WISHLIST":
			return { ...state, wishlist: payload.wishlist };
		case "ADD_TO_WISHLIST":
      // Add to existing array type of push
			return { ...state, wishlist: [...state.wishlist, payload] };
		case "DELETE_FROM_WISHLIST":
			return { ...state,wishlist:state.wishlist.filter((item)=>item !== payload) };
		case "CLEAR_ALL_INPUTS":
			return {...state,wishlist:[]}
		default:
			return state; 
	}
};

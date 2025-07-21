import { Children, createContext, useContext, useEffect, useReducer } from "react";
import { wishlistReducer } from "../reducer/wishlistReducer";
import useApi from "../useApi";
import { ENDPOINTS } from "../apiUtils";
import { AuthContext } from "./AuthContext";

const initialValue = {
	wishlist: [],
};

export const WishlistContext = createContext(initialValue);

const WishlistContextProvider = ({ children }) => {

	const [{ wishlist }, wishlistDispatch] = useReducer(
		wishlistReducer,
		initialValue
	);

	return (
		<WishlistContext.Provider value={{ wishlist, wishlistDispatch }}>
			{children}
		</WishlistContext.Provider>
	);
};

export default WishlistContextProvider;

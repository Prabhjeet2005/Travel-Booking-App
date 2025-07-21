import axios from "axios";


export const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
	withCredentials: true,
});

export const ENDPOINTS = {
	USERS: {
		SIGNUP: "users/signup",
		LOGIN: "users/login",
		LOGOUT: "users/logout",
	},
	HOTEL: {
		DISPLAY: "hotels/displayHotels",
		FINDID: "hotels",
	},
	WISHLIST: {
		DISPLAY: "wishlist/getWishlist",
		DISPLAYIDONLY: "wishlist/getWishlistIdOnly",
		ADD: "wishlist/addToWishlist",
		DELETE: "wishlist/deleteFromWishlist",
	},
	CATEGORIES: {
		DISPLAY: `categories/displayCategories?category=`,
	},
	ORDERS: {
		DISPLAY: `orders/getAllOrders`,
		ADD: `orders/addOrders`,
	},
};

export const REQUEST_TYPES = {
	GET: "get",
	POST: "post",
	PUT: "put",
	PATCH: "patch",
	DELETE: "delete",
};

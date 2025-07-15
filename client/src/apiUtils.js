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
		FINDID: "hotels/:id",
	},
	WISHLIST: {
		DISPLAY: "wishlist/getWishlist",
		ADD: "wishlist/addToWishlist",
		DELETE: "wishlist/deleteFromWishlist/:id",
	},
	CATEGORIES: {
		DISPLAY: `categories/displayCategories?category=`,
	},
};

export const REQUEST_TYPES = {
	GET: "get",
	POST: "post",
	PUT: "put",
	PATCH: "patch",
	DELETE: "delete",
};

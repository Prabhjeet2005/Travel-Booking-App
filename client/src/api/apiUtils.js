import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
	withCredentials: true,
});

export const ENDPOINTS = {
	USER: {
		SIGNUP: "user/signup",
		LOGIN: "user/login",
		LOGOUT: "user/logout",
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
};

export const REQUEST_TYPES = {
	GET: "get",
	POST: "post",
	PUT: "put",
	PATCH: "patch",
	DELETE: "delete",
};

export const isHotelInWishlist = (wishlistPassed, currentHotelId) => {
	return wishlistPassed.some((item) => item === currentHotelId);
};

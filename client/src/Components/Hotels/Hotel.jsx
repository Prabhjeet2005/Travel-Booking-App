import React, { useContext, useEffect, useState } from "react";
import { HotelCard } from "./HotelCard/HotelCard";
import useApi from "../../useApi";
import { ENDPOINTS, REQUEST_TYPES } from "../../api/apiUtils";
import { UserContext } from "../../context/UserContextProvider";
import "./Hotel.css"

export const Hotel = () => {
	const [hotels, setHotels] = useState([]);
  const [wishlist,setWishlist] = useState([])
	const { makeRequest: hotelRequest } = useApi(
		ENDPOINTS.HOTEL.DISPLAY,
		REQUEST_TYPES.GET
	);
  const {makeRequest:getWishlist} = useApi(ENDPOINTS.WISHLIST.DISPLAY,REQUEST_TYPES.GET)
	const { userData, isLoading, message, success } = useContext(UserContext);
  

	useEffect(() => {
		hotelRequest();
    getWishlist();
	}, []);

	useEffect(() => {
		setHotels(userData || []);
	}, [success, message, isLoading, userData]);
  useEffect(()=>{
    setWishlist(userData || [])
  },[wishlist])
	return (
			<section className="hotel-card-container">
				{hotels.map((hotel) => (
					<HotelCard key={hotel._id} wishlist={wishlist} hotel={hotel} />
				))}
			</section>
	);
};

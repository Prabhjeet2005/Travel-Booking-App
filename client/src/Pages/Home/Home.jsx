import React, { useContext, useEffect, useState } from "react";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import { UserContext } from "../../context/UserContextProvider";
import "./Home.css";
import axios from "axios";
import { Categories, HotelCard, NavBar } from "../../Components/index";
import useApi from "../../useApi";
import { CategoryContext } from "../../context/CategoryContextProvider";

export const Home = () => {
	const [hotels, setHotels] = useState([]);
  const {hotelCategory,setHotelCategory} = useContext(CategoryContext)

	const { makeRequest: hotelRequest } = useApi(
		ENDPOINTS.HOTEL.DISPLAY,
		REQUEST_TYPES.GET
	);

	const { userData, isLoading, message, success } = useContext(UserContext);

	useEffect(() => {
		(async () => {
      console.log("🚀 ~ hotelCategory:", hotelCategory)
      const hotelData = await axios.get(
				`http://localhost:3500/api/hotels/displayHotels?category=${hotelCategory}`
      );
			// const hotelData = await hotelRequest();
			setHotels(hotelData.data.data || []);
		})();

	}, [hotelCategory]);
	console.log("🚀 ~ Home ~ hotelCategory:", hotelCategory)


	return (
		<>
			<NavBar />
			<Categories />
			<section className="hotel-card-container">
				{hotels && hotels.length >0 ? hotels.map((hotel) => (
					<HotelCard key={hotel._id}  hotel={hotel} />
				)):<section>No Hotels For Category "{hotelCategory}" Found</section>}
			</section>
		</>
	);
};


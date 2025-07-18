import React, { useContext, useEffect, useState } from "react";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import { UserContext } from "../../context/UserContextProvider";
import "./Home.css";
import axios from "axios";
import { Categories, HotelCard, NavBar } from "../../Components/index";
import useApi from "../../useApi";
import { CategoryContext } from "../../context/CategoryContextProvider";
import SearchStayWithDate from "../../Components/SearchStayWithDate/SearchStayWithDate";
import { DateContext } from "../../context/DateContext";

export const Home = () => {
	const [hotels, setHotels] = useState([]);
  const {hotelCategory,setHotelCategory} = useContext(CategoryContext)

	const { makeRequest: hotelRequest } = useApi(
		ENDPOINTS.HOTEL.DISPLAY,
		REQUEST_TYPES.GET
	);
	const {isSearchModalOpen} = useContext(DateContext);

	const { userData, isLoading, message, success } = useContext(UserContext);

	useEffect(() => {
		(async () => {
      const hotelData = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}hotels/displayHotels?category=${hotelCategory}`
			);
			// const hotelData = await hotelRequest();
			setHotels(hotelData.data.data || []);
		})();

	}, [hotelCategory]);


	return (
		<>
			<NavBar />
			<Categories />
			<section className="hotel-card-container">
				{hotels && hotels.length > 0 ? (
					hotels.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)
				) : (
					<section>No Hotels Found In {hotelCategory}  </section>
				)}
			</section>
			{isSearchModalOpen && <SearchStayWithDate />}
		</>
	);
};


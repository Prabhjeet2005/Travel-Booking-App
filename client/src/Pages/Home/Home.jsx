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
import { Ban, Funnel } from "react-bootstrap-icons";
import { FilterContext } from "../../context/FilterContext";
import Filters from "../../Components/Filters/Filters";
import { getHotelsByPrice } from "../../utlis/FilterHotelByPrice";
import { getHotelsByRoomsAndBeds } from "../../utlis/FilterHotelByRoomsAndBeds";
import { getFilteredPropertyType } from "../../utlis/FilterHotelByProperty";
import { getFilteredHotelByRating } from "../../utlis/FilterHotelByRating";
import { getFilteredHotelCancellable } from "../../utlis/FilterHotelByCancellable";

export const Home = () => {
	const [hotels, setHotels] = useState([]);
	const { hotelCategory, setHotelCategory } = useContext(CategoryContext);

	const { makeRequest: hotelRequest } = useApi(
		ENDPOINTS.HOTEL.DISPLAY,
		REQUEST_TYPES.GET
	);
	const { isSearchModalOpen } = useContext(DateContext);

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
	console.log({ hotels });

	const {
		propertyType,
		isFilterWindowOpen,
		priceRange,
		numberOfBathrooms,
		numberOfBedrooms,
		numberOfBeds,
		rating,
		isCancelable,
		filterDispatch,
	} = useContext(FilterContext);
	const handleFilterClick = () => {
		filterDispatch({
			type: "TOGGLE_FILTER_WINDOW",
		});
	};
	const filterHotelByPriceRange = getHotelsByPrice(hotels, priceRange);
	const filterHotelByRoomsAndBeds = getHotelsByRoomsAndBeds(
		filterHotelByPriceRange,
		numberOfBeds,
		numberOfBedrooms,
		numberOfBathrooms
	);
	const filterHotelByPropertyType = getFilteredPropertyType(
		filterHotelByRoomsAndBeds,
		propertyType
	);
	const filterHotelByRating = getFilteredHotelByRating(
		filterHotelByPropertyType,rating
	);
	const filterByCancellable = getFilteredHotelCancellable(
		filterHotelByRating,
		isCancelable
	);

	return (
		<>
			<NavBar />
			<Categories />

			<section onClick={handleFilterClick} className="filter-label-icon">
				<Funnel />
			</section>
			{isFilterWindowOpen && <Filters />}

			<section className="hotel-card-container">
				{filterByCancellable && filterByCancellable.length > 0 ? (
					filterByCancellable.map((hotel) => (
						<HotelCard key={hotel._id} hotel={hotel} />
					))
				) : (
					<section className="ban-icons">
						No Hotels Found <Ban />{" "}
					</section>
				)}
			</section>
		</>
	);
};

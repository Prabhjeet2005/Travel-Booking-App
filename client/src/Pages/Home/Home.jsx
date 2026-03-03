import React, { useContext, useEffect, useState } from "react";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import "./Home.css";
import axios from "axios";
import { Categories, HotelCard, NavBar } from "../../Components/index";
import useApi from "../../useApi";
import { CategoryContext } from "../../context/CategoryContextProvider";
import { Ban, Funnel } from "react-bootstrap-icons";
import { FilterContext } from "../../context/FilterContext";
import Filters from "../../Components/Filters/Filters";
import { getHotelsByPrice } from "../../utlis/FilterHotelByPrice";
import { getHotelsByRoomsAndBeds } from "../../utlis/FilterHotelByRoomsAndBeds";
import { getFilteredPropertyType } from "../../utlis/FilterHotelByProperty";
import { getFilteredHotelByRating } from "../../utlis/FilterHotelByRating";
import { getFilteredHotelCancellable } from "../../utlis/FilterHotelByCancellable";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import { AiSearchBar } from "../../Components/AiSearchBar/AiSearchBar";

export const Home = () => {
	const [hotels, setHotels] = useState([]);
	const { hotelCategory } = useContext(CategoryContext);

	useEffect(() => {
		(async () => {
			const hotelData = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}hotels/displayHotels?category=${hotelCategory}`,
			);
			setHotels(hotelData.data.data || []);
		})();
	}, [hotelCategory]);

	const { wishlistDispatch } = useContext(WishlistContext);
	const { isUserLoggedIn } = useContext(AuthContext);
	const { makeRequest: getWishlist } = useApi(
		ENDPOINTS.WISHLIST.DISPLAYIDONLY,
	);

	useEffect(() => {
		try {
			if (isUserLoggedIn) {
				(async () => {
					const storedWishlist = await getWishlist();
					if (storedWishlist) {
						wishlistDispatch({
							type: "EXISTING_WISHLIST",
							payload: storedWishlist,
						});
					}
				})();
			}
		} catch (error) {
			console.log(error);
		}
	}, [isUserLoggedIn]);

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

	const handleFilterClick = () =>
		filterDispatch({ type: "TOGGLE_FILTER_WINDOW" });

	const filterHotelByPriceRange = getHotelsByPrice(hotels, priceRange);
	const filterHotelByRoomsAndBeds = getHotelsByRoomsAndBeds(
		filterHotelByPriceRange,
		numberOfBeds,
		numberOfBedrooms,
		numberOfBathrooms,
	);
	const filterHotelByPropertyType = getFilteredPropertyType(
		filterHotelByRoomsAndBeds,
		propertyType,
	);
	const filterHotelByRating = getFilteredHotelByRating(
		filterHotelByPropertyType,
		rating,
	);
	const filterByCancellable = getFilteredHotelCancellable(
		filterHotelByRating,
		isCancelable,
	);

	return (
		<>
			<NavBar />
			<Categories />

			<section className="fixed min-w-[50%] z-10 bottom-1 left-0 right-0 x-translate-middle">
				<AiSearchBar />
			</section>

			{/* ✅ NEW: Industry Standard Filter Bar */}
			<div className="home-action-bar">
				<span className="results-count">
					{filterByCancellable.length}{" "}
					{filterByCancellable.length === 1 ? "property" : "properties"}{" "}
					found
				</span>
				<button onClick={handleFilterClick} className="modern-filter-btn">
					<Funnel size={16} /> Filters
				</button>
			</div>

			{isFilterWindowOpen && <Filters />}

			<section className="hotel-card-container">
				{filterByCancellable && filterByCancellable.length > 0 ? (
					filterByCancellable.map((hotel) => (
						<HotelCard key={hotel._id} hotel={hotel} />
					))
				) : (
					<section className="ban-icons">
						No Hotels Found <Ban />
					</section>
				)}
			</section>
		</>
	);
};

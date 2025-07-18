import React, { useContext, useEffect, useState } from "react";
import DateSelect from "../DateSelect/DateSelect";
import { PersonAdd, Search, X } from "react-bootstrap-icons";
import "./SearchStayWithDate.css";
import { DateContext } from "../../context/DateContext";
import { CategoryContext } from "../../context/CategoryContextProvider";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const SearchStayWithDate = () => {
	const {
		isSearchModalOpen,
		isDestinationDropdownOpen,
		destination,
		guests,
		dateDispatch,
	} = useContext(DateContext);

	const [hotels, setHotels] = useState([]);
	const { hotelCategory, setHotelCategory } = useContext(CategoryContext);

	useEffect(() => {
		(async () => {
			const hotelData = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}hotels/displayHotels?category=${hotelCategory}`
			);
			setHotels(hotelData.data.data || []);
		})();
	}, [hotelCategory]);

	const handleSearchModalOpen = () => {
		dateDispatch({
			type: "OPEN_SEARCH_MODAL",
		});
	};

	const handleDestinationChange = (e) => {
		dateDispatch({
			type: "DESTINATION",
			payload: e.target.value,
		});
	};

	const handleGuestsChange = (e) => {
		dateDispatch({
			type: "GUESTS",
			payload: e.target.value,
		});
	};

	const destinationOptions = hotels.filter(
		({ address, city, state, country }) => 
			address.toLowerCase().includes(destination.toLowerCase()) ||
				city.toLowerCase().includes(destination.toLowerCase()) ||
				state.toLowerCase().includes(destination.toLowerCase()) ||
				country.toLowerCase().includes(destination.toLowerCase())
		
	);

	const handleDestinationOptionClick = (address)=>{
		dateDispatch({
			type:"DESTINATION",
			payload:address
		})
		dateDispatch({
			type:"HIDE_DESTINATION_DROPDOWN"
		})
	}

	const handleDestinationFocus = ()=>{
		dateDispatch({
			type:"SHOW_DESTINATION_DROPDOWN"
		})
	}

	const handleGuestFocus = ()=>{
		dateDispatch({
			type: "HIDE_DESTINATION_DROPDOWN",
		});
	}

	const navigate = useNavigate();
	const handleSearchButtonClick = ()=>{
		navigate(`/hotels/searchResults/${destination}`)
	}

	return (
		<section className="search-stay-background">
			<section className="search-stay-container">
				<section className="search-stay-label-input-container">
					<section className="search-stay">Destination</section>
					<section className="search-stay">
						<input
							className="search-stay-input"
							placeholder="Search Destination"
							onChange={(e) => handleDestinationChange(e)}
							onFocus={handleDestinationFocus}
							value={destination}
							autoFocus
						/>
					</section>
				</section>
				<section className="search-stay-label-input-container">
					<label>Check in</label>
					<DateSelect checkInType="in" />
				</section>
				<section className="search-stay-label-input-container">
					<label>Check out</label>
					<DateSelect checkInType="out" />
				</section>
				<section className="search-stay-label-input-container">
					<section className="search-stay">Guests</section>
					<section className="search-stay">
						<input
							className="search-stay-input"
							onFocus={handleGuestFocus}
							placeholder="Add Guests"
							defaultValue={1}
							value={guests}
							onChange={(e) => handleGuestsChange(e)}
						/>
					</section>
				</section>
				<section
					onClick={handleSearchButtonClick}
					className="search-button hover-tranform">
					<Search />
				</section>
				<section
					className="cross-icon hover-tranform"
					onClick={handleSearchModalOpen}>
					<X />
				</section>
				{isDestinationDropdownOpen && (
					<section className="destination-options">
						{destinationOptions &&
							destinationOptions.map(({ _id, address, city }) => (
								<section
									key={_id}
									onClick={() => handleDestinationOptionClick(address)}
									className="destination-options-item">
									{address},{city}
								</section>
							))}
					</section>
				)}
			</section>
		</section>
	);
};

export default SearchStayWithDate;

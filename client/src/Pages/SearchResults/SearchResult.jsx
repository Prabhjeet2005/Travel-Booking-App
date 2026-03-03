import React, { useContext, useEffect, useState } from "react";
import "./SearchResult.css";
import axios from "axios";
import { DateContext } from "../../context/DateContext";
import { HotelCard, NavBar } from "../../Components";
import { useParams } from "react-router";
import { Search } from "react-bootstrap-icons";

const SearchResult = () => {
	const [hotels, setHotels] = useState([]);
	const { destination } = useContext(DateContext);

	// 1. The AI passes the city name into this URL parameter!
	const { address } = useParams();

	useEffect(() => {
		(async () => {
			const hotelData = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}hotels/displayHotels`,
			);
			setHotels(hotelData.data.data || []);
		})();
	}, []); // Removed destination dependency to fetch all hotels reliably

	// 2. ✅ FIX: Use the AI's URL parameter first, fallback to context if empty
	const searchTerm = address || destination || "";

	// 3. ✅ FIX: Use .includes() for more robust AI matching instead of strict ===
	const searchedHotels = hotels.filter(
		({ address: hotelAddr, city, state }) =>
			hotelAddr.toLowerCase().includes(searchTerm.toLowerCase()) ||
			city.toLowerCase().includes(searchTerm.toLowerCase()) ||
			state.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<>
			<NavBar />
			<section className="search-results">
				Found {searchedHotels.length} Search{" "}
				{searchedHotels.length > 1 ? (
					<span>Results</span>
				) : (
					<span>Result</span>
				)}{" "}
				<Search />
			</section>
			<section className="hotel-card-container">
				{searchedHotels && searchedHotels.length > 0 ? (
					searchedHotels.map((hotel) => (
						<HotelCard key={hotel._id} hotel={hotel} />
					))
				) : (
					<section
						style={{
							textAlign: "center",
							marginTop: "2rem",
							width: "100%",
						}}>
						<h2>No Hotels Found for "{searchTerm}"</h2>
					</section>
				)}
			</section>
		</>
	);
};

export default SearchResult;

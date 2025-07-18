import React, { useContext, useEffect, useState } from "react";
import "./SearchResult.css";
import axios from "axios";
import { DateContext } from "../../context/DateContext";
import { HotelCard, NavBar } from "../../Components";
import { useParams } from "react-router";
import { Funnel, Search } from "react-bootstrap-icons";
const SearchResult = () => {
	const [hotels, setHotels] = useState([]);
	const { destination } = useContext(DateContext);
  const {address} = useParams()

	useEffect(() => {
		(async () => {
			const hotelData = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}hotels/displayHotels`
			);
			setHotels(hotelData.data.data || []);
		})();
	}, [destination]);

  const searchedHotels = hotels.filter(({address,city,state})=>
    address.toLowerCase() === destination.toLowerCase() ||
  city.toLowerCase() === destination.toLowerCase() ||
  state.toLowerCase() === destination.toLowerCase() 
) 
	return (
		<>
			<NavBar />
			<section className="search-results">
				 Found {searchedHotels.length} Search {searchedHotels.length >1 ? <span>Results</span>: <span>Result</span> } <Search />
			</section>
			<section className="hotel-card-container">

					{searchedHotels && searchedHotels.length > 0 ? (
						searchedHotels.map((hotel) => (
							<HotelCard key={hotel._id} hotel={hotel} />
						))
					) : (
						<section>No Hotels Found </section>
					)}

			</section>
		</>
	);
};

export default SearchResult;

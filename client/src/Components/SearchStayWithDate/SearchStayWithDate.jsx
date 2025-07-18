import React, { useContext } from 'react'
import DateSelect from '../DateSelect/DateSelect'
import {PersonAdd, Search, X} from "react-bootstrap-icons"
import "./SearchStayWithDate.css"
import { DateContext } from '../../context/DateContext'
const SearchStayWithDate = () => {
  const { isSearchModalOpen, dateDispatch } = useContext(DateContext);
  const handleSearchModalOpen = ()=>{
    dateDispatch({
			type: "OPEN_SEARCH_MODAL",
		});
  }
  return (
		<section className="search-stay-background">
			<section className="search-stay-container">
				<section className="search-stay-label-input-container">
					<section className="search-stay">Where</section>
					<section className="search-stay">
						<input
							className="search-stay-input"
							placeholder="Search Destination"
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
						<input className="search-stay-input" placeholder="Add Guests" />
					</section>
				</section>
				<section className="search-button hover-tranform">
					<Search />
				</section>
				<section
					className="cross-icon hover-tranform"
					onClick={handleSearchModalOpen}>
					<X />
				</section>
			</section>
		</section>
	);
}

export default SearchStayWithDate
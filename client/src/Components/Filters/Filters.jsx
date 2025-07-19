import React, { useContext } from "react";
import { Funnel, XLg } from "react-bootstrap-icons";
import "./Filters.css";
import FilterPriceRange from "./FilterPriceRange/FilterPriceRange";
import FilterBedBathroom from "./FilterBedBathroom/FilterBedBathroom";
import PropertyType from "./FilterPropertyType/PropertyType";
import FilterRating from "./FilterRating/FilterRating";
import { FilterContext } from "../../context/FilterContext";

const Filters = () => {
	const {isCancelable,isFilterWindowOpen,filterDispatch} = useContext(FilterContext)
	const handleFilterWindowClose = ()=>{
		filterDispatch({
			type: "TOGGLE_FILTER_WINDOW",
		});
		console.log(isFilterWindowOpen);
	}

	const handleChecked = ()=>{
		filterDispatch({
			type:"CANCEL_TOGGLE",
		})
	}

	const handleClearAllClick = ()=>{
		filterDispatch({
			type:"CLEAR_ALL"
		})
	}

	return (
		<section className="background-blurry">
			<section className="filter-container">
				<section className="filter-item same-row">
					<section className="same-row heading-filter">
						 <Funnel /> Filters
					</section>
					<section onClick={handleFilterWindowClose} className="cross-icons">
						<XLg />
					</section>
				</section>
				<section className="filter-item seperate-row">
					<section className="heading">Price Range </section>
					<section>
						<FilterPriceRange />
					</section>
				</section>
				<FilterBedBathroom />
        <PropertyType />
        <FilterRating />
        <section className="heading same-row free-cancel">
          <section className="">Free Cancellation</section>
          <input onClick={handleChecked} checked={isCancelable} value={isCancelable} className="checkbox" type="checkbox" />
        </section>
        <section className="clear-apply-container" onClick={handleClearAllClick}>
          <section className="clear-all">Clear Filters</section>
        </section>
			</section>
		</section>
	);
};

export default Filters;

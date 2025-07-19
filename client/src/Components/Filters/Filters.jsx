import React from "react";
import { Funnel, XLg } from "react-bootstrap-icons";
import "./Filters.css";
import FilterPriceRange from "./FilterPriceRange/FilterPriceRange";
import FilterBedBathroom from "./FilterBedBathroom/FilterBedBathroom";
import PropertyType from "./FilterPropertyType/PropertyType";
import FilterRating from "./FilterRating/FilterRating";

const Filters = () => {
	return (
		<section className="background-blurry">
			<section className="filter-container">
				<section className="filter-item same-row">
					<section className="same-row heading-filter">
						 <Funnel /> Filters
					</section>
					<section className="cross-icons">
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
          <input className="checkbox" type="checkbox" />
        </section>
        <section className="clear-apply-container">
          <section className="clear-all">Clear Filters</section>
          <section className="apply-changes">Apply Filters</section>
        </section>
			</section>
		</section>
	);
};

export default Filters;

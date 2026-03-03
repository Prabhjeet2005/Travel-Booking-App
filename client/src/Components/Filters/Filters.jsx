import React, { useContext } from "react";
import { Funnel, XLg } from "react-bootstrap-icons";
import "./Filters.css";
import FilterPriceRange from "./FilterPriceRange/FilterPriceRange";
import FilterBedBathroom from "./FilterBedBathroom/FilterBedBathroom";
import PropertyType from "./FilterPropertyType/PropertyType";
import FilterRating from "./FilterRating/FilterRating";
import { FilterContext } from "../../context/FilterContext";

const Filters = () => {
	const { isCancelable, filterDispatch } = useContext(FilterContext);

	const handleFilterWindowClose = () => {
		filterDispatch({
			type: "TOGGLE_FILTER_WINDOW",
		});
	};

	const handleChecked = () => {
		filterDispatch({
			type: "CANCEL_TOGGLE",
		});
	};

	const handleClearAllClick = () => {
		filterDispatch({
			type: "CLEAR_ALL",
		});
		handleFilterWindowClose(); // Closes the modal after clearing
	};

	// ✅ NEW: Closes modal if user clicks on the blurry background outside the modal
	const handleOverlayClick = (e) => {
		if (e.target.classList.contains("background-blurry")) {
			handleFilterWindowClose();
		}
	};

	return (
		<section className="background-blurry" onClick={handleOverlayClick}>
			<section className="filter-container">
				{/* Header */}
				<section className="filter-item">
					<section className="heading-filter">
						<Funnel size={22} /> Filters
					</section>
					<section
						onClick={handleFilterWindowClose}
						className="cross-icons">
						<XLg />
					</section>
				</section>

				{/* Price Range */}
				<section className="seperate-row mt-2">
					<section className="heading">Price Range</section>
					<section>
						<FilterPriceRange />
					</section>
				</section>

				<FilterBedBathroom />
				<PropertyType />
				<FilterRating />

				{/* Free Cancellation Checkbox */}
				<section className="seperate-row">
					<section className="free-cancel">
						<section className="heading mb-0">Free Cancellation</section>
						<input
							onChange={handleChecked}
							checked={isCancelable}
							className="checkbox"
							type="checkbox"
						/>
					</section>
				</section>

				{/* Footer Clear Button */}
				<section className="clear-apply-container">
					<button onClick={handleClearAllClick} className="clear-all">
						Clear all
					</button>
				</section>
			</section>
		</section>
	);
};

export default Filters;

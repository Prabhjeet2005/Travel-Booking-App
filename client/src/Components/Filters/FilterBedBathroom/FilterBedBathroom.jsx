import React, { useContext } from "react";
import "./FilterBedBathroom.css";
import { FilterContext } from "../../../context/FilterContext";

const FilterBedBathroom = () => {
	const options = ["Any", "1+", "2+", "3+", "4+", "5+"];
	const {
		numberOfBathrooms,
		numberOfBedrooms,
		numberOfBeds,
		isFilterWindowOpen,
		priceRange,
		filterDispatch,
	} = useContext(FilterContext);

	const handleBedroomOptionClick = (item) => {
		filterDispatch({
			type: "BEDROOM",
			payload: item,
		});
	};
	const handleBedsOptionClick = (item) => {
		filterDispatch({
			type: "BEDS",
			payload: item,
		});
	};
	const handleBathroomOptionClick = (item) => {
		filterDispatch({
			type: "BATHROOM",
			payload: item,
		});
	};
	return (
		<section className="outer-container">
			<section className="label-container">
				<section className="labels">Bedrooms</section>
				<section className="labels">Beds</section>
				<section className="labels">Bathrooms</section>
			</section>
			<section className="options-container">
				<section className="options-row-container">
					{options.map((item) => (
						<section
							onClick={() => handleBedroomOptionClick(item)}
							className={`options-row-item ${
								numberOfBedrooms.toString() === item ? "selected" : ""
							}`}
							key={item}>
							{item}
						</section>
					))}
				</section>
				<section className="options-row-container">
					{options.map((item) => (
						<section
							onClick={() => handleBedsOptionClick(item)}
							className={`options-row-item ${
								numberOfBeds.toString() === item ? "selected" : ""
							}`}
							key={item}>
							{item}
						</section>
					))}
				</section>
				<section className="options-row-container">
					{options.map((item) => (
						<section
							onClick={() => handleBathroomOptionClick(item)}
							className={`options-row-item ${
								numberOfBathrooms.toString() === item ? "selected" : ""
							}`}
							key={item}>
							{item}
						</section>
					))}
				</section>
			</section>
		</section>
	);
};

export default FilterBedBathroom;

// TODO :  Make A New Filter for bedroom bathroom beds

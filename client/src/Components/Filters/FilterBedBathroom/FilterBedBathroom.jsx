import React from "react";
import "./FilterBedBathroom.css";

const FilterBedBathroom = () => {
	const options = ["Any", "1", "2", "3", "4", "5+"];

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
						<section className="options-row-item" key={item}>{item}</section>
					))}
				</section>
				<section className="options-row-container">
					{options.map((item) => (
						<section className="options-row-item" key={item}>{item}</section>
					))}
				</section>
				<section className="options-row-container">
					{options.map((item) => (
						<section className="options-row-item" key={item}>{item}</section>
					))}
				</section>
			</section>
		</section>
	);
};

export default FilterBedBathroom;

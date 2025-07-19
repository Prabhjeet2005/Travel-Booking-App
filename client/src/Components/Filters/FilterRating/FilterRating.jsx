import React from "react";
import { StarFill } from "react-bootstrap-icons";
import "./FilterRating.css";

const FilterRating = () => {
	const ratings = ["1+", "2+", "3+", "4+", "5"];
	return (
		<section className="rating-container">
			<section className="rating-title">Rating</section>
			<section className="rating-button-container">
				{ratings.map((rate) => (
					<section className="rating-button" key={rate}>
						<StarFill className="star-icons" />
						{rate}
					</section>
				))}
			</section>
		</section>
	);
};

export default FilterRating;

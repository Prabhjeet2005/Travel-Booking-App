import React, { useContext } from "react";
import { StarFill } from "react-bootstrap-icons";
import "./FilterRating.css";
import { FilterContext } from "../../../context/FilterContext";

const FilterRating = () => {
	const ratings = ["1+", "2+", "3+", "4+", "5"];
	const {rating,filterDispatch} = useContext(FilterContext)
	
	const handleRatingClick = (rate)=>{
		filterDispatch({
			type:"RATING",
			payload:rate
		})
	}
	return (
		<section className="rating-container">
			<section className="rating-title">Rating</section>
			<section className="rating-button-container">
				{ratings.map((rate) => (
					<section onClick={()=>handleRatingClick(rate)} className={`rating-button ${rating === rate ? "selected-rating":""}`} key={rate}>
						<StarFill className="star-icons" />
						{rate}
					</section>
				))}
			</section>
		</section>
	);
};

export default FilterRating;

import React from "react";
import { GeoAlt, Heart, HeartFill } from "react-bootstrap-icons";
import "./HotelCard.css";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router";

export const HotelCard = ({ hotel, wishlist={} }) => {
	const { _id,image, address, state, name, rating, price } = hotel;
	const navigate = useNavigate()

	const handleExploreClick = ()=>{
		// Only frontend So it works
		// Just For Navigation No Backend Involved Here
		navigate(`/hotels/${name}/${address}-${state}/${_id}`);
	}
	return (
		<section className="hotel-card relative">
			<section>
				<img
					className="hotel-card-image"
					src={image}
					loading="lazy"
					alt="Hotel Image"
				/>
			</section>
			<section className="hotel-card-title-container">
				<span className="hotel-card-title">
					<span>{address}</span>
					<section className="hotel-location">
						<GeoAlt />
						{state}
					</section>
				</span>
				<span className="hotel-card-rating">
					<span>
						<Rating readonly allowFraction initialValue={rating} size={20} />
					</span>
					<span>{rating.toFixed(1)}</span>
				</span>
			</section>
			<section className="hotel-card-desc">{name}</section>
			<section className="hotel-card-price-explore-container">
				<section className="hotel-card-price">
				&#8377;{price}
				<span className="hotel-card-night">/night</span>{" "}
			</section>
			<section onClick={handleExploreClick} className="hotel-card-explore">Explore</section>
			</section>
			
			<section className="hotel-card-heart">
				<HeartFill />
			</section>
		</section>
	);
};

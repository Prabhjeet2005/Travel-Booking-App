import React from "react";
import { GeoAlt, Heart, HeartFill } from "react-bootstrap-icons";
import "./HotelCard.css";
import { Rating } from "react-simple-star-rating";
import useApi from "../../useApi";
import { ENDPOINTS } from "../../apiUtils";

export const HotelCard = ({ hotel, wishlist }) => {
	const { image, address, state, name, rating, price } = hotel;
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
			<section className="hotel-card-price">
				&#8377;{price}
				<span className="hotel-card-night">/night</span>{" "}
			</section>
			<section className="hotel-card-heart">
				<HeartFill />
			</section>
		</section>
	);
};

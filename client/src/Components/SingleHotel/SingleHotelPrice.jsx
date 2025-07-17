import React from "react";
import { Person } from "react-bootstrap-icons";
import { Rating } from "react-simple-star-rating";
import "./SingleHotelComponent.css";

const SingleHotelPrice = ({ singleHotel }) => {
	const { price, rating } = singleHotel;
	return (
		<section className="single-hotel-price-book-container">
			<section className="hotel-title-container">
				<section className="hotel-card-price">
					&#8377;{price}
					<span className="hotel-card-night">/night</span>{" "}
				</section>
				<section>
					<span className="hotel-rating">
						<span>
							<Rating readonly allowFraction initialValue={rating} size={26} />
						</span>
						{rating && (
							<span className="hotel-rating-number">{rating.toFixed(1)}</span>
						)}
					</span>
				</section>
			</section>
			<section className="check-container">
				<section>Check-in</section>
				<section>Check-out</section>
			</section>
			<section className="guest-container">
				<section>GUESTS</section>
				<section className="guest-number">
					<Person /> 2
				</section>
			</section>
			<section>
				<button className="button-reserve">Reserve</button>
			</section>
			<section className="price-details">
				<section className="price-details-item">
					{price && (
						<>
							<section>&#8377;{price} x 2 nights</section>
							<section>&#8377;{(price * 2).toFixed(2)}</section>
						</>
					)}
				</section>
				<section className="price-details-item">
					<section>Service Fee</section>
					<section>&#8377;200</section>
				</section>
				<section className="price-details-item price-total">
					<section>Total</section>
					{price && <section>&#8377;{(price * 2 + 200).toFixed(2)}</section>}
				</section>
			</section>
		</section>
	);
};

export default SingleHotelPrice;

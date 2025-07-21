import React, { useContext } from "react";
import { People, Person } from "react-bootstrap-icons";
import { Rating } from "react-simple-star-rating";
import "./SingleHotelComponent.css";
import DateSelect from "../DateSelect/DateSelect";
import { DateContext } from "../../context/DateContext";
import { useNavigate } from "react-router";

const SingleHotelPrice = ({ singleHotel }) => {
	const { _id, price, rating } = singleHotel;
	const { checkInDate, checkOutDate, guests, dateDispatch } =
		useContext(DateContext);
	const handleGuestChange = (e) => {
		dateDispatch({
			type: "GUESTS",
			payload: e.target.value,
		});
	};

	const navigate = useNavigate();
	const handleReserveClick = () => {
		navigate(`/order/${_id}`);
	};

	const numberOfNights =
		checkInDate && checkOutDate
			? (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
			: 0;

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
				<section>
					Check-in <DateSelect checkInType={"in"} />{" "}
				</section>
				<section>
					Check-out <DateSelect checkInType={"out"} />
				</section>
			</section>
			<section className="guest-container">
				<section>
					{guests > 1 ? <span>GUESTS</span> : <span>GUEST</span>}{" "}
				</section>
				<section className="guest-number">
					<span className="person-icon">
						{guests > 1 ? <People /> : <Person />}
					</span>{" "}
					<input
						className="guest-input"
						type="Number"
						onChange={(e) => handleGuestChange(e)}
						min={0}
						value={guests}
						placeholder="Enter Guests"
					/>
				</section>
			</section>
			<section>
				<button
					disabled={checkInDate && checkOutDate && guests > 0 ? false : true}
					onClick={handleReserveClick}
					className={`button-reserve`}>
					Reserve
				</button>
			</section>
			<section className="price-details">
				<section className="price-details-item">
					{price && (
						<>
							<section>
								&#8377;{price} x {numberOfNights} nights
							</section>
							<section>&#8377;{(price * numberOfNights).toFixed(2)}</section>
						</>
					)}
				</section>
				<section className="price-details-item">
					<section>Service Fee</section>
					<section>&#8377;200</section>
				</section>
				<section className="price-details-item price-total">
					<section>Total</section>
					{price && (
						<section>
							&#8377;{(price * numberOfNights + 200).toFixed(2)}
						</section>
					)}
				</section>
			</section>
		</section>
	);
};

export default SingleHotelPrice;

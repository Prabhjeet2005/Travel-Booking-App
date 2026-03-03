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

	// ✅ MATH FIX: Ensure it strictly requires CheckOut to be AFTER CheckIn
	const numberOfNights =
		checkInDate && checkOutDate && checkOutDate > checkInDate
			? Math.ceil(
					(checkOutDate.getTime() - checkInDate.getTime()) /
						(1000 * 3600 * 24),
				)
			: 0;

	// ✅ LOGIC FIX: A booking is ONLY valid if there is at least 1 night and 1 guest
	const isValidBooking = numberOfNights > 0 && guests > 0;

	return (
		<section className="single-hotel-price-book-container">
			<section className="hotel-title-container">
				<section className="hotel-card-price">
					&#8377;{price}
					<span className="hotel-card-night"> / night</span>{" "}
				</section>
				<section>
					<span className="hotel-rating">
						<span>
							<Rating
								readonly
								allowFraction
								initialValue={rating}
								size={18}
							/>
						</span>
						{rating && (
							<span className="hotel-rating-number">
								{rating.toFixed(1)}
							</span>
						)}
					</span>
				</section>
			</section>

			<div className="booking-inputs-wrapper">
				<section className="check-container">
					<section>
						Check-in
						<div className="mt-1">
							<DateSelect checkInType={"in"} />
						</div>
					</section>
					<section>
						Check-out
						<div className="mt-1">
							<DateSelect checkInType={"out"} />
						</div>
					</section>
				</section>
				<section className="guest-container">
					<section>
						{guests > 1 ? <span>Guests</span> : <span>Guest</span>}
					</section>
					<section className="guest-number">
						<span className="person-icon" style={{ fontSize: "1.2rem" }}>
							{guests > 1 ? <People /> : <Person />}
						</span>{" "}
						<input
							className="guest-input"
							type="Number"
							onChange={(e) => handleGuestChange(e)}
							min={1} // ✅ UX FIX: Prevent 0 or negative guests in input
							value={guests}
							placeholder="Add guests"
						/>
					</section>
				</section>
			</div>

			{/* ✅ SHOW ERROR IF DATES ARE WRONG */}
			{checkInDate && checkOutDate && numberOfNights === 0 && (
				<div className="text-red-500 text-sm font-bold mb-4 text-center">
					Check-out date must be after Check-in date.
				</div>
			)}

			<section>
				<button
					disabled={!isValidBooking} // ✅ Now using our secure boolean!
					onClick={handleReserveClick}
					className={`button-reserve`}>
					Reserve
				</button>
			</section>

			{/* Only show the breakdown if the booking is valid */}
			{isValidBooking && (
				<section className="price-details">
					<section className="price-details-item">
						{price && (
							<>
								<section>
									&#8377;{price} x {numberOfNights} nights
								</section>
								<section>
									&#8377;{(price * numberOfNights).toFixed(2)}
								</section>
							</>
						)}
					</section>
					<section className="price-details-item">
						<section>{guests} guests</section>
						<section>&#8377;{((price * numberOfNights).toFixed(2) * guests).toFixed(2)}</section>
					</section>
					<section className="price-details-item">
						<section>Service Fee</section>
						<section>&#8377;200</section>
					</section>
					<section className="price-details-item price-total">
						<section>Total</section>
						{price && (
							<section>
								&#8377;{(((price * numberOfNights ).toFixed(2) * guests) + 200).toFixed(2)}
							</section>
						)}
					</section>
				</section>
			)}
		</section>
	);
};

export default SingleHotelPrice;

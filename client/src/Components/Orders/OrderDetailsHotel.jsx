import React, { useContext, useEffect, useState } from "react";
import "./OrderDetails.css";
import { useNavigate, useParams } from "react-router";
import useApi from "../../useApi";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import { Rating } from "react-simple-star-rating";
import { DateContext } from "../../context/DateContext";
import { v4 as uuid } from "uuid";
import { HotelContext } from "../../context/HotelContext";
import { AuthContext } from "../../context/AuthContext";
import { LockFill } from "react-bootstrap-icons";

const OrderDetailsHotel = () => {
	const { id } = useParams();
	const { hotels, setHotels } = useContext(HotelContext);
	const { makeRequest: getHotelDetails } = useApi(
		`${ENDPOINTS.HOTEL.FINDID}/${id}`,
		REQUEST_TYPES.GET,
	);
	const { makeRequest: addHotelOrder } = useApi(
		ENDPOINTS.ORDERS.ADD,
		REQUEST_TYPES.POST,
	);

	const [singleHotel, setSingleHotel] = useState({});

	useEffect(() => {
		try {
			(async () => {
				const payload = await getHotelDetails();
				setSingleHotel(payload);
			})();
		} catch (error) {
			console.log(error);
		}
	}, []);

	const { image, name, address, state, rating, price } = singleHotel;
	const { checkInDate, checkOutDate } = useContext(DateContext);
	const { isUserLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();

	const numberOfNights =
		checkInDate && checkOutDate
			? (checkOutDate.getTime() - checkInDate.getTime()) /
				(1000 * 60 * 60 * 24)
			: 0;
	const totalPayableAmount = price * numberOfNights + 200;

	const loadScript = (source) => {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = source;
			script.onload = () => resolve(true);
			script.onerror = () => resolve(false);
			document.body.appendChild(script);
		});
	};

	const handleConfirmBookingClick = async () => {
		if (!isUserLoggedIn) {
			navigate("/login");
			return;
		}
		const response = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js",
		);
		if (!response) console.log({ message: "Razorpay SDK failed to load" });

		const options = {
			key: process.env.REACT_APP_KEY,
			amount: totalPayableAmount * 100,
			currency: "INR",
			name: "Journeaze",
			description: "Secure Hotel Booking",
			handler: ({ payment_id }) => {
				// Update Context
				setHotels({
					...hotels,
					orderId: uuid(),
					checkInDate: checkInDate.toLocaleDateString("en-US", {
						day: "numeric",
						month: "short",
					}),
					checkOutDate: checkOutDate.toLocaleDateString("en-US", {
						day: "numeric",
						month: "short",
					}),
					totalPayableAmount,
					name,
					image,
					address,
					state,
				});

				// Update DB
				const payload = {
					orderId: uuid(),
					checkInDate,
					checkOutDate,
					totalPayableAmount,
					name,
					image,
					address,
					state,
				};
				try {
					(async () => {
						const isHotelAdded = await addHotelOrder(payload);
						if (isHotelAdded) navigate("/order-summary");
					})();
				} catch (error) {
					console.log(error);
				}
			},
		};
		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};

	return (
		<section className="checkout-summary-card">
			{/* Top Hotel Info */}
			<div className="checkout-card-header">
				<img className="checkout-hotel-image" src={image} alt="Hotel" />
				<div className="checkout-hotel-meta">
					<p className="checkout-hotel-name">{name}</p>
					<p className="checkout-hotel-location">
						{address}, {state}
					</p>
					<div className="checkout-hotel-rating">
						<Rating
							readonly
							allowFraction
							initialValue={rating || 0}
							size={14}
						/>
						<span className="rating-number">{rating?.toFixed(1)}</span>
					</div>
				</div>
			</div>

			<hr className="checkout-divider" />

			{/* Price Breakdown */}
			<div className="checkout-price-details">
				<h3 className="price-details-title">Price details</h3>

				<div className="price-row">
					<span>
						&#8377;{price} x {numberOfNights}{" "}
						{numberOfNights > 1 ? "nights" : "night"}
					</span>
					<span>&#8377;{(price * numberOfNights).toFixed(2)}</span>
				</div>

				<div className="price-row">
					<span className="underline-text">Service Fee</span>
					<span>&#8377;200.00</span>
				</div>

				<hr className="checkout-divider" />

				<div className="price-row total-row">
					<span>Total (INR)</span>
					<span>&#8377;{totalPayableAmount.toFixed(2)}</span>
				</div>
			</div>

			<button
				onClick={handleConfirmBookingClick}
				className="checkout-pay-btn">
				<LockFill size={18} /> Confirm & Pay
			</button>
		</section>
	);
};

export default OrderDetailsHotel;

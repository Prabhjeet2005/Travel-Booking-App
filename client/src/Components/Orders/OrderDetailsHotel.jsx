import React, { useContext, useEffect, useState } from "react";
import "./OrderDetails.css";
import { useLocation, useNavigate, useParams } from "react-router";
import useApi from "../../useApi";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import { GeoAlt } from "react-bootstrap-icons";
import { Rating } from "react-simple-star-rating";
import DateSelect from "../DateSelect/DateSelect";
import { DateContext } from "../../context/DateContext";
import { v4 as uuid } from "uuid";
import { HotelContext } from "../../context/HotelContext";
import { AuthContext } from "../../context/AuthContext";

const OrderDetailsHotel = () => {
	const { id } = useParams();

	const { hotels, setHotels } = useContext(HotelContext);

	const { makeRequest: getHotelDetails } = useApi(
		`${ENDPOINTS.HOTEL.FINDID}/${id}`,
		REQUEST_TYPES.GET
	);

	const { makeRequest: addHotelOrder } = useApi(
		ENDPOINTS.ORDERS.ADD,
		REQUEST_TYPES.POST
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
	const numberOfNights =
		(checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);

	const totalPayableAmount = price * numberOfNights + 200;
	const navigate = useNavigate();

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
		if(!isUserLoggedIn){
			navigate("/login");
			return;
		}
		const response = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);
		if (!response) {
			console.log({ message: "Razorpay SDK failed to load" });
		}

		const options = {
			key: process.env.REACT_APP_KEY,
			amount: totalPayableAmount * 100,
			currency: "INR",
			name: "Journeaze",
			email: process.env.REACT_APP_EMAIL,
			contact: process.env.REACT_APP_CONTACT,
			description: "Thank you for booking with us",

			handler: ({ payment_id }) => {
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
				const orderId = uuid();
				const payload = {
					orderId,
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
						if (isHotelAdded) {
							navigate("/order-summary");
						}
					})();
				} catch (error) {
					console.log(error);
				}
			},
			prefill: {
				name: process.env.REACT_APP_NAME,
				email: process.env.REACT_APP_EMAIL,
				contact: process.env.REACT_APP_CONTACT,
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};
	return (
		<section className="single-hotel-price-book-container">
			<section>
				<img className="hotel-image" src={image} alt="Hotel Image" />
			</section>
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

			<section className="price-details">
				<section className="price-details-item">
					{price && (
						<>
							<section>
								&#8377;{price} x {numberOfNights}{" "}
								{numberOfNights > 1 ? "nights" : "night"}
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
			<section
				onClick={handleConfirmBookingClick}
				className="order-detail-confirm">
				Confirm Booking
			</section>
		</section>
	);
};

export default OrderDetailsHotel;

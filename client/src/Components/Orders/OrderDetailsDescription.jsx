import React, { useContext, useEffect, useState } from "react";
import { Calendar4Week, ShieldLockFill } from "react-bootstrap-icons";
import "./OrderDetails.css";
import { DateContext } from "../../context/DateContext";

const OrderDetailsDescription = () => {
	const { checkInDate, checkOutDate, guests } = useContext(DateContext);

	// Date Formatter
	const formatDate = (date) => {
		if (!date) return "";
		return date.toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<section className="checkout-left-container">
			<div className="checkout-header">
				<h1 className="checkout-title">Review your trip</h1>
			</div>

			<div className="checkout-section">
				<div className="checkout-trip-row">
					<div className="checkout-trip-info">
						<h3>Dates</h3>
						<p>
							{formatDate(checkInDate)} – {formatDate(checkOutDate)}
						</p>
					</div>
				</div>

				<div className="checkout-trip-row">
					<div className="checkout-trip-info">
						<h3>Guests</h3>
						<p>
							{guests} {guests > 1 ? "guests" : "guest"}
						</p>
					</div>
				</div>
			</div>

			<hr className="checkout-divider" />

			<div className="checkout-section">
				<h2 className="checkout-subtitle">Pay with Razorpay</h2>
				<p className="checkout-security-text">
					<ShieldLockFill className="security-icon" />
					Your payment is secured and encrypted by Razorpay.
				</p>
				<div className="razorpay-logo-wrapper">
					<img
						src="/images/razorpay.png"
						alt="Razorpay Secure"
						className="razorpay-badge"
					/>
				</div>
			</div>

			<hr className="checkout-divider" />

			<p className="checkout-terms">
				By selecting the button below, I agree to the Host's House Rules,
				Ground rules for guests, and Journeaze's Rebooking and Refund
				Policy.
			</p>
		</section>
	);
};

export default OrderDetailsDescription;

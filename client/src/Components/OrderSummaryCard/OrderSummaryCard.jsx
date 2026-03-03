import React from "react";
import "./OrderSummaryCard.css";
import { GeoAlt, CheckCircleFill } from "react-bootstrap-icons";

const OrderSummaryCard = ({ allOrders }) => {
	const extractedData = allOrders.data;
	const {
		orderId,
		checkInDate,
		checkOutDate,
		totalPayableAmount,
		name,
		image,
		address,
		state,
	} = extractedData;

	const inDateObj = new Date(checkInDate);
	const outDateObj = new Date(checkOutDate);

	// Format dates cleanly
	const CheckInUpdated = inDateObj.toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		year: "numeric",
	});
	const CheckOutUpdated = outDateObj.toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	return (
		<section className="order-card-wrapper max-w-5xl">
			{/* Image Section */}
			<section className="order-image-container">
				<img className="order-card-image" src={image} alt={name} />
				<div className="order-status-badge">
					<CheckCircleFill size={14} /> Confirmed
				</div>
			</section>

			{/* Details Section */}
			<section className="order-content-container min-h-fit">
				<div className="order-header-row">
					<div className="order-hotel-info">
						<h3 className="order-hotel-name">{name}</h3>
						<p className="order-hotel-location">
							<GeoAlt className="location-icon" /> {address}, {state}
						</p>
					</div>
					<div className="order-price-block">
						<span className="price-label">Amount Paid</span>
						<span className="price-value">
							&#8377;{totalPayableAmount}
						</span>
					</div>
				</div>

				<hr className="order-divider" />

				{/* Dates Section */}
				<div className="order-dates-row">
					<div className="date-block">
						<span className="date-label">Check-in</span>
						<span className="date-value">{CheckInUpdated}</span>
					</div>
					<div className="date-divider"></div>
					<div className="date-block">
						<span className="date-label">Check-out</span>
						<span className="date-value">{CheckOutUpdated}</span>
					</div>
				</div>

				{/* Footer Section */}
				<div className="order-footer-row">
					<span className="order-id-label">
						Order ID: <span className="order-id-tag">{orderId}</span>
					</span>
				</div>
			</section>
		</section>
	);
};

export default OrderSummaryCard;

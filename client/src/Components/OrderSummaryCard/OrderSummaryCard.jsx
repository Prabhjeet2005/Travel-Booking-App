import React from "react";

import "./OrderSummaryCard.css";
import { GeoAlt } from "react-bootstrap-icons";

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

// get a nice “Tue Jul 22 2025” style string
const CheckInUpdated = inDateObj.toDateString(); // "Tue Jul 22 2025"
const CheckOutUpdated = outDateObj.toDateString(); // "Thu Jul 25 2025"
console.log("🚀 ~ OrderSummaryCard ~ CheckInUpdated:", CheckInUpdated)
console.log("🚀 ~ OrderSummaryCard ~ CheckOutUpdated:", CheckOutUpdated)



	return (
		<section className="order-summary-outer-container">
			<section className="order-summary-image-container">
				<img className="order-summary-image" src={image} alt="Hotel Image" />
			</section>
			<section className="order-summary-right-container">
				<section className="display-flex-row space-between">
					<section className="display-flex-column name-container">
						<section className="order-summary-name"> {name} </section>
						<section></section>
						<section className="order-summary-">
							<GeoAlt /> {address},{state}{" "}
						</section>
					</section>
					<section className="display-flex-column checkin-checkout-container">
						<section className="order-summary-">
							<span>
								<b>Check-in</b>
							</span>{" "}
							{CheckInUpdated}
						</section>
						<section className="order-summary-">
							<span>
								<b>Check-out</b>
							</span>{" "}
							{CheckOutUpdated}
						</section>
						<section className="order-summary-price">
							Amount Paid: &#8377;{totalPayableAmount}
						</section>
					</section>
				</section>

				<section className="display-flex-column">
					<section className="order-summary-">
						OrderID: <span className="order-tags">{orderId}</span>
					</section>
				</section>
			</section>
		</section>
	);
};

export default OrderSummaryCard;

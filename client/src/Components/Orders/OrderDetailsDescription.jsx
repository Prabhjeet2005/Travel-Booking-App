import React, { useContext, useEffect, useState } from "react";
import BathtubIcon from "@mui/icons-material/Bathtub";
import Hotel from "@mui/icons-material/Hotel";
import {
	Airplane,
	ArrowLeftRight,
	Calendar4Week,
	GeoAlt,
	HouseDoor,
	InfoCircle,
	Paypal,
	People,
	Person,
} from "react-bootstrap-icons";
import "./OrderDetails.css";
import { DateContext } from "../../context/DateContext";
import useApi from "../../useApi";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import { useParams } from "react-router";

const OrderDetailsDescription = () => {
	const { checkInDate, checkOutDate, guests } = useContext(DateContext);
	const { id } = useParams();
	const { makeRequest: getHotelDetails } = useApi(
		`${ENDPOINTS.HOTEL.FINDID}/${id}`,
		REQUEST_TYPES.GET
	);

	const [hotel, setHotel] = useState([]);
	useEffect(() => {
		try {
			(async () => {
				const payload = await getHotelDetails();
				setHotel(payload);
			})();
		} catch (error) {
			console.log(error);
		}
	}, []);
	const { image, name, address, state, rating, price, country } = hotel;
	return (
		<section className="order-detail-container">
			<section className="order-detail-title">
				<InfoCircle />
				Trip Details <Airplane />
			</section>
			<section className="order-detail-content-container">
				<section className="order-detail-content">
					{" "}
					<HouseDoor /> {name}{" "}
				</section>
				<section className="order-detail-content">
					<GeoAlt /> {address},{state},{country}
				</section>

				<section className="order-detail-content">
					<Calendar4Week />{" "}
					{checkInDate &&
						checkInDate.toLocaleDateString("en-US", {
							day: "numeric",
							month: "short",
						})}{" "}
					-{" "}
					{checkOutDate &&
						checkOutDate.toLocaleDateString("en-US", {
							day: "numeric",
							month: "short",
						})}
				</section>
				<section className="order-detail-content">
					{guests > 1 ? <People /> : <Person />}
					{guests}
				</section>
			</section>
			<section className="order-detail-mini-title">
				<span className="order-detail-razorpay-title">
					Razorpay <ArrowLeftRight />
				</span>
			</section>
		</section>
	);
};

export default OrderDetailsDescription;

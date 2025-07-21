import React, { useContext, useEffect, useState } from "react";
import OrderDetailsDescription from "../../Components/Orders/OrderDetailsDescription";
import OrderDetailsHotel from "../../Components/Orders/OrderDetailsHotel";
import "./Orders.css";
import { NavBar } from "../../Components";
import { DateContext } from "../../context/DateContext";
import { useNavigate, useParams } from "react-router";
import useApi from "../../useApi";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import {v4 as uuid} from "uuid"

const Orders = () => {

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
const numberOfNights =
	checkInDate && checkOutDate
		? (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
		: 0;

    const totalPayableAmount = price * numberOfNights + 150;

		const loadScript = (source) => {
			return new Promise((resolve) => {
				const script = document.createElement("script");
				script.src = source;
				script.onload = () => resolve(true);
				script.onerror = () => resolve(false);
				document.body.appendChild(script);
			});
		};
    const navigate = useNavigate()
		
	return (
		<>
    <NavBar />
			<section className="order-outer-container">
				<OrderDetailsDescription />
				<OrderDetailsHotel />
			</section>
		</>
	);
};

export default Orders;

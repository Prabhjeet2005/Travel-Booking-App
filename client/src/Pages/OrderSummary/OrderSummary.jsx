import React, { useContext, useEffect, useState } from "react";
import { HotelContext } from "../../context/HotelContext";
import useApi from "../../useApi";
import { ENDPOINTS } from "../../apiUtils";
import { NavBar } from "../../Components";
import "./OrderSummary.css";
import OrderSummaryCard from "../../Components/OrderSummaryCard/OrderSummaryCard";
import { Ban, Luggage } from "react-bootstrap-icons";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const OrderSummary = () => {
	const { hotels } = useContext(HotelContext);
	const { makeRequest: getAllOrders } = useApi(ENDPOINTS.ORDERS.DISPLAY);
	const [allOrders, setAllOrders] = useState([]);
  const {isUserLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()
	useEffect(() => {
		try {
			(async () => {
        if(isUserLoggedIn){
				const payload = await getAllOrders();
        console.log("🚀 ~ payload:", payload.orders)
        console.log(payload)
				setAllOrders(payload.orders);} 
        else{
          navigate("/login")
        }
			})();
		} catch (error) {}
	}, []);
  console.log("🚀 ~ OrderSummary ~ allOrders:", allOrders)
  console.log(allOrders);
	return (
		<>
			<NavBar />
			<section className="order-summary-container">
				<section className="order-summary-title">
					Your Orders <Luggage />{" "}
				</section>
				{allOrders.length > 0 ? (
					allOrders.map((item) => (
						<OrderSummaryCard key={item.data.orderId} allOrders={item} />
					))
				) : (
					<section className="ban-icons">
						No Orders Found <Ban />{" "}
					</section>
				)}
			</section>
		</>
	);
};

export default OrderSummary;

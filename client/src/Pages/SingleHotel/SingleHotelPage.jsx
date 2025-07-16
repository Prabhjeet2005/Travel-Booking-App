import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavBar } from "../../Components/index";
import SingleHotelImage from "../../Components/SingleHotel/SingleHotelImage";
import "./SingleHotelPage.css";

const SingleHotelPage = () => {
	const params = useParams();
	const { id } = params;
	const [singleHotel, setSingleHotel] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(
					`${process.env.REACT_APP_SERVER_URL}hotels/${id}`
				);
				setSingleHotel(data.data || []);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [id]);

	return (
		<>
			<NavBar />
			<section className="main-page-container">
				<SingleHotelImage singleHotel={singleHotel} />
        <section className="hotel-description-container">
          <section></section>
          <section></section>
        </section>
			</section>
		</>
	);
};

export default SingleHotelPage;

import { useState, useEffect } from "react";
import "./SingleHotelComponent.css";
import { GeoAlt } from "react-bootstrap-icons";

const SingleHotelImage = ({ singleHotel }) => {
	const { image, imageArr, name, state } = singleHotel;
	const [imgArray, setImgArray] = useState([]);
	const [mainImg, setMainImg] = useState("");

	useEffect(() => {
		setImgArray(imageArr);
		setMainImg(image);
	}, [image, imageArr]);

	return (
		<>
			<section className="single-hotel-title">
				{name}, <GeoAlt className="location-pin" />
				{state}
			</section>
			<section className="single-hotel-img-container">
				<section className="single-hotel-main-img">
					{mainImg && (
						<img src={mainImg} className="main-img" alt="Main Image" />
					)}
				</section>
				<section className="single-hotel-four-image-container">
					{imgArray &&
						imgArray.map((item) => (
							<img
								className="single-hotel-four-image"
								key={item}
								src={item}
								onError={(e) => {
									e.currentTarget.onerror = null; // prevent infinite loop
									e.currentTarget.src = "/images/download.jpeg";
								}}
								alt="Hotel Image"
							/>
						))}
				</section>
			</section>
		</>
	);
};

export default SingleHotelImage;

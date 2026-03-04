import React, { useContext } from "react";
import { GeoAlt, Heart, HeartFill } from "react-bootstrap-icons";
import "./HotelCard.css";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";
import useApi from "../../useApi";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import { isHotelInWishlist } from "../../utlis/isHotelInWishlist";

export const HotelCard = ({ hotel }) => {
	const { _id, image, address, state, name, rating, price } = hotel;
	const navigate = useNavigate();

	const handleExploreClick = () => {
		// Only frontend So it works
		// Just For Navigation No Backend Involved Here
		navigate(`/hotels/${name}/${address}-${state}/${_id}`);
	};

	const { isUserLoggedIn } = useContext(AuthContext);
	const { wishlist, wishlistDispatch } = useContext(WishlistContext);
	
	const { makeRequest: addWishlist } = useApi(
		ENDPOINTS.WISHLIST.ADD,
		REQUEST_TYPES.POST
	);
	const { makeRequest: deleteWishlist } = useApi(
		`${ENDPOINTS.WISHLIST.DELETE}/${_id}`,
		REQUEST_TYPES.DELETE
	);

	const isHotelPresentInWishlist = isHotelInWishlist(wishlist, _id);

	const handleWishlistIconHotelCardClick = () => {
		if (isUserLoggedIn) {
			try {
				const payload = { _id };
				if (!isHotelPresentInWishlist) {
					(async () => {
						const addedToWishlist = await addWishlist(payload);
						if (addedToWishlist) {
							wishlistDispatch({
								type: "ADD_TO_WISHLIST",
								payload: _id,
							});
						}
					})();
				} else if (isHotelPresentInWishlist) {
					(async () => {
						const removedFromWishlist = await deleteWishlist();
						if (removedFromWishlist) {
							wishlistDispatch({
								type: "DELETE_FROM_WISHLIST",
								payload: _id,
							});
						}
					})();
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			navigate("/login");
		}
	};

	return (
		<section className="hotel-card relative">
			<section>
				<img
					className="hotel-card-image"
					src={image}
					loading="lazy"
					alt="Hotel Image"
					onError={(e) => {
						e.currentTarget.onerror = null;
						e.currentTarget.src = "/images/download.jpeg";
					}}
				/>
			</section>
			<div className="hotel-card-content">
				<section className="hotel-card-title-container">
					<span className="hotel-card-title">
						<span>{address}</span>
						<section className="hotel-location">
							<GeoAlt />
							{state}
						</section>
					</span>
					<span className="hotel-card-rating">
						<span>
							<Rating
								readonly
								allowFraction
								initialValue={rating}
								size={20}
							/>
						</span>
						<span>{rating}</span>
					</span>
				</section>
				<section className="hotel-card-desc">{name}</section>
				<section className="hotel-card-price-explore-container">
					<section className="hotel-card-price">
						&#8377;{price}
						<span className="hotel-card-night">/night</span>{" "}
					</section>
					<section
						onClick={handleExploreClick}
						className="hotel-card-explore">
						Explore
					</section>
				</section>

				<section
					onClick={handleWishlistIconHotelCardClick}
					className={`hotel-card-heart ${
						isHotelPresentInWishlist ? "heart-select" : ""
					}`}>
					<HeartFill />
				</section>
			</div>
		</section>
	);
};

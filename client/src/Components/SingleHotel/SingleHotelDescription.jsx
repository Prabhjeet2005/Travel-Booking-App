import React from "react";
import { ArrowReturnRight, Check2Circle, ClipboardPlus, ColumnsGap, DashLg, ListCheck } from "react-bootstrap-icons";

const SingleHotelDescription = ({ singleHotel }) => {
	const {
		numberOfBathrooms,
		numberOfBeds,
		numberOfguest,
		numberOfBedrooms,
		numberOfStudies,
		hostName,
		hostJoinedOn,
		ameneties,
		healthAndSafety,
		houseRules,
		propertyType,
		isCancelable,
	} = singleHotel;
	console.log(ameneties);

	return (
		<section className="single-hotel-container">
			<section className="single-hotel-hosted">Hosted By {hostName}</section>

			<section className="single-hotel-rooms">
				{numberOfguest > 1 ? (
					<span className="single-hotel-rooms-item">
						{numberOfguest} Guests
					</span>
				) : (
					<span className="single-hotel-rooms-item">{numberOfguest} Guest</span>
				)}
				,
				{numberOfBedrooms > 1 ? (
					<span className="single-hotel-rooms-item">
						{numberOfBedrooms} Bedrooms
					</span>
				) : (
					<span className="single-hotel-rooms-item">
						{numberOfBedrooms} Bedroom
					</span>
				)}
				,
				{numberOfBeds > 1 ? (
					<span className="single-hotel-rooms-item">{numberOfBeds} Beds</span>
				) : (
					<span className="single-hotel-rooms-item">{numberOfBeds} Bed</span>
				)}
				,
				{numberOfBathrooms > 1 ? (
					<span className="single-hotel-rooms-item">
						{numberOfBathrooms} Bathrooms
					</span>
				) : (
					<span className="single-hotel-rooms-item">
						{numberOfBathrooms} Bathroom
					</span>
				)}
			</section>
			<hr />
			<section className="single-hotel-choose">
				Why Choose Us? <ColumnsGap className="column-icon" />
			</section>

			<section className="single-hotel-ameneties-container">
				{ameneties &&
					ameneties.map((item) => (
						<section className="single-hotel-amenetie-item" key={item}>
							<Check2Circle className="check-green" /> {item}
						</section>
					))}
				{isCancelable ? (
					<section className="single-hotel-cancellation">
						<Check2Circle className="check-green" /> Free Cancellation before 7
						Days of Booking
					</section>
				) : (
					<section className="single-hotel-cancellation">
						No Cancellation Available
					</section>
				)}
			</section>
			<hr />
			<section>
				<section className="single-hotel-choose">
					Health &amp; Safety <ClipboardPlus className="clipboard-icon" />{" "}
				</section>
				<section className="single-hotel-ameneties-container">
					{healthAndSafety &&
						healthAndSafety.map((item) => (
							<section key={item}>
								{" "}
								<DashLg /> {item}
							</section>
						))}
				</section>
			</section>
			<hr />
			<section>
				<section className="single-hotel-choose">
					Rules While Staying <ListCheck />{" "}
				</section>
				<section className="single-hotel-ameneties-container">
					{houseRules &&
						houseRules.map((item) => <section key={item}> <ArrowReturnRight /> {item}</section>)}
				</section>
			</section>
		</section>
	);
};

export default SingleHotelDescription;

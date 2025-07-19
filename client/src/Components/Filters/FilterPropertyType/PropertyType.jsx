import React from "react";
import "./PropertyType.css";


const PropertyType = () => {
	const propType = ["House", "Guest House", "Flat", "Hotel"];
	return (
		<section className="property-outer-container">
			<section className="property-title">Property Type</section>
			<section className="property-container">
				{propType.map((type) => (
					<section className="property-button" key={type}>{type}</section>
				))}
			</section>
		</section>
	);
};

export default PropertyType;

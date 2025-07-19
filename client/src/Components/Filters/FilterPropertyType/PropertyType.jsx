import React, { useContext } from "react";
import "./PropertyType.css";
import { FilterContext } from "../../../context/FilterContext";


const PropertyType = () => {
	const propType = ["House", "Guest House", "Flat", "Hotel"];
	const {propertyType,filterDispatch} = useContext(FilterContext)
	const handlePropertyTypeClick = (property)=>{
		filterDispatch({
			type:"PROPERTY",
			payload:property
		})
	}
	return (
		<section className="property-outer-container">
			<section className="property-title">Property Type</section>
			<section className="property-container">
				{propType.map((type) => (
					<section onClick={()=>handlePropertyTypeClick(type)} className={`property-button ${propertyType === type ? "selected":""}`} key={type}>{type}</section>
				))}
			</section>
		</section>
	);
};

export default PropertyType;

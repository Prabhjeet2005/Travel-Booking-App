import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "../Filters.css";
import { useContext } from "react";
import { FilterContext } from "../../../context/FilterContext";

const minDifference = 3000;
function valuetext(value) {
	return `${value}`;
}

const FilterPriceRange = () => {
	const { priceRange, filterDispatch } = useContext(FilterContext);
	const handlePriceChange = (event, newValue, activeThumb) => {
		if (!Array.isArray(newValue)) {
			return;
		}
		if (activeThumb === 0) {
			// Left Slider
			filterDispatch({
				type: "MIN_PRICE",
				payload: {
					newValue,
					priceRange,
					minDifference,
				},
			});
		} else if (activeThumb === 1) {
			//RightSlider
			filterDispatch({
				type: "MAX_PRICE",
				payload: {
					newValue,
					priceRange,
					minDifference,
				},
			});
		}
	};
	return (
		<Box sx={{ width: "90%", color: "orange" }}>
			<Slider
				sx={{ color: "orange" }}
				getAriaLabel={() => "Min. Difference"}
				value={priceRange}
				onChange={handlePriceChange}
				valueLabelDisplay="on"
				getAriaValueText={valuetext}
				min={100}
				max={25000}
				disableSwap
			/>
		</Box>
	);
};

export default FilterPriceRange;

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "../Filters.css";

const value = 20000;
function valuetext(value) {
	return `${value}`;
}

const FilterPriceRange = () => {
	return (
		<Box sx={{ width: "90%", color:"orange" }}>
			<Slider sx={{color:"orange"}}
				getAriaLabel={() => "Min. Difference"}
				value={value}
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

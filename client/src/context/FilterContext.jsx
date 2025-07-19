import { createContext, useReducer } from "react";
import { filterReducer } from "../reducer/filterReducer";

const initialValue = {
	isFilterWindowOpen: false,
	priceRange: [200, 25000],
	numberOfBathrooms: "Any",
	numberOfBedrooms: "Any",
	numberOfBeds: "Any",
	propertyType: "",
	rating: "1+",
	isCancelable:true,
};

export const FilterContext = createContext(initialValue);

const FilterContextProvider = ({ children }) => {
	const [
		{
			rating,
			propertyType,
			numberOfBathrooms,
			numberOfBedrooms,
			numberOfBeds,
			isFilterWindowOpen,
			priceRange,
			isCancelable,
		},
		filterDispatch,
	] = useReducer(filterReducer, initialValue);
	return (
		<FilterContext.Provider
			value={{
				rating,
				propertyType,
				numberOfBathrooms,
				numberOfBedrooms,
				numberOfBeds,
				isFilterWindowOpen,
				priceRange,
				isCancelable,
				filterDispatch,
			}}>
			{children}
		</FilterContext.Provider>
	);
};

export default FilterContextProvider;

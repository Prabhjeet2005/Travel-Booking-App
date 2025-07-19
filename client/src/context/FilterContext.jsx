import { createContext, useReducer } from "react";
import { filterReducer } from "../reducer/filterReducer";

const initialValue = {
	isFilterWindowOpen: false,
	priceRange: [200, 25000],
	numberOfBathrooms: "Any",
	numberOfBedrooms: "Any",
	numberOfBeds: "Any",
};

export const FilterContext = createContext(initialValue);

const FilterContextProvider = ({ children }) => {
	const [
		{
			numberOfBathrooms,
			numberOfBedrooms,
			numberOfBeds,
			isFilterWindowOpen,
			priceRange,
		},
		filterDispatch,
	] = useReducer(filterReducer, initialValue);
	return (
		<FilterContext.Provider
			value={{
				numberOfBathrooms,
				numberOfBedrooms,
				numberOfBeds,
				isFilterWindowOpen,
				priceRange,
				filterDispatch,
			}}>
			{children}
		</FilterContext.Provider>
	);
};

export default FilterContextProvider;

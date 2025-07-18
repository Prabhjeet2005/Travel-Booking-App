import { createContext, useReducer } from "react";
import dateReducer from "../reducer/dateReducer";

const initialState = {
	isSearchModalOpen: false,
	checkInDate: null,
	checkOutDate: null,
	destination: "",
	guests: 0,
	isDestinationDropdownOpen:true,
};

export const DateContext = createContext(initialState);

const DateContextProvider = ({ children }) => {
	const [
		{
			isSearchModalOpen,
			checkInDate,
			checkOutDate,
			destination,
			guests,
			isDestinationDropdownOpen,
		},
		dateDispatch,
	] = useReducer(dateReducer, initialState);
	return (
		<DateContext.Provider
			value={{
				destination,
				guests,
				isSearchModalOpen,
				checkInDate,
				checkOutDate,
				isDestinationDropdownOpen,
				dateDispatch,
			}}>
			{children}
		</DateContext.Provider>
	);
};

export default DateContextProvider;

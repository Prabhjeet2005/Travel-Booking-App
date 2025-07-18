import { createContext, useReducer } from "react";
import dateReducer from "../reducer/dateReducer";

const initialState = {
	isSearchModalOpen: false,
	checkInDate: null,
	checkOutDate: null,
};

export const DateContext = createContext(initialState);

const DateContextProvider = ({ children }) => {
	const [{ isSearchModalOpen, checkInDate, checkOutDate }, dateDispatch] =
		useReducer(dateReducer, initialState);
	return (
		<DateContext.Provider
			value={{ isSearchModalOpen, checkInDate, checkOutDate, dateDispatch }}>
			{children}
		</DateContext.Provider>
	);
};

export default DateContextProvider;

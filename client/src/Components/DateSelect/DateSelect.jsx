import React, { useContext } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { DateContext } from '../../context/DateContext';

const DateSelect = ({ checkInType }) => {
	const { checkInDate, checkOutDate, dateDispatch } =
		useContext(DateContext);

	const handleDateChange = (date) => {
		if (checkInType === "in") {
			dateDispatch({
				type: "CHECK_IN",
				payload: date,
			});
			// If check-in is changed to be AFTER the current check-out, reset check-out
			if (checkOutDate && date >= checkOutDate) {
				dateDispatch({ type: "CHECK_OUT", payload: null });
			}
		} else {
			dateDispatch({
				type: "CHECK_OUT",
				payload: date,
			});
		}
	};

	// ✅ UX FIX: Prevent past dates for Check-in
	const minCheckInDate = new Date();

	// ✅ UX FIX: Check-out MUST be at least 1 day after Check-in
	const minCheckOutDate = checkInDate
		? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
		: new Date();

	return (
		<DatePicker
			className="date-picker searchBar"
			selected={checkInType === "in" ? checkInDate : checkOutDate}
			onChange={(date) => handleDateChange(date)}
			dateFormat="dd/MM/yyyy"
			placeholderText="Add Date"
			closeOnScroll={true}
			// Apply the dynamic restrictions here:
			minDate={checkInType === "in" ? minCheckInDate : minCheckOutDate}
		/>
	);
};

export default DateSelect;
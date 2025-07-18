import React, { useContext } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { DateContext } from '../../context/DateContext';

const DateSelect = ({checkInType}) => {
  const { dateDispatch, checkInDate, checkOutDate } = useContext(DateContext);
  const handleDateChange =(date)=>{
    dateDispatch({
      type: checkInType === "in" ? "CHECK_IN":"CHECK_OUT",
      payload: date
    })
  }
	const handleDateFocus = () => {
		dateDispatch({
			type: "HIDE_DESTINATION_DROPDOWN",
		});
	}
  return (
		<div>
			<DatePicker
				className="search-stay-input"
				selected={checkInType === "in" ? checkInDate : checkOutDate}
				onChange={(date) => handleDateChange(date)}
				onFocus={handleDateFocus}
				dateFormat="dd/MM/yyyy"
				placeholderText="Add Dates"
				minDate={checkInType==="in"? new Date():checkInDate}
				closeOnScroll={true}
			/>
		</div>
	);
}

export default DateSelect
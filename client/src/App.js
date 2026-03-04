import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "./context/UserContextProvider";

const App = () => {
	const {message,success} = useContext(UserContext)
	useEffect(() => {
		if (
			success &&
			(message === "User Logged In Successfully!" ||
				message === "User Signned Up Successfully!" ||
				message === "Logged Out Successfully" ||
				message === "Hotel Added To Wishlist Successfully")
		) {
			toast.success(message);
		}
		if(!success){
			toast.error(message)
		}
	}, [success,message])

	useEffect(() => {
		console.log(
			"%c⚠️ STOP!",
			"color: red; font-size: 30px; font-weight: bold;",
		);
		console.log(
			"%cThis is the original portfolio work of Prabhjeet Singh Sandhu. Unauthorized copying or academic submission is prohibited.",
			"font-size: 16px;",
		);
	}, []);
	
	return (
		<>
			<ToastContainer />
			<Outlet />
		</>
	);
};

export default App;

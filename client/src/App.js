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
				message === "Logged Out Successfully")
		) {
			toast.success(message);
		}
		if(!success){
			toast.error(message)
		}
	}, [success,message])
	
	return (
		<>
			<ToastContainer />
			<Outlet />
		</>
	);
};

export default App;

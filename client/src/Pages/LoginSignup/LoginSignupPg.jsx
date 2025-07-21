import React from "react";
import Login from "../../Components/Login/Login";
import Signup from "../../Components/Signup/Signup";

import { NavBar } from "../../Components/NavBar/NavBar";
import { useLocation } from "react-router";

const LoginSignupPg = () => {
	const {pathname} = useLocation();
	console.log("🚀 ~ LoginSignupPg ~ pathname:", pathname)

	return (
		<>
			<NavBar />
			{pathname === "/signup"?<Signup />:pathname === "/login"?<Login />:""}
		</>
	);
};

export default LoginSignupPg;

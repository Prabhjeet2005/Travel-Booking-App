import React from "react";
import { Home } from "./Pages/index";
import { Outlet } from "react-router";

const App = () => {
	return (
		<>
			<Outlet />
		</>
	);
};

export default App;

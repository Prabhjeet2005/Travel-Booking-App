import { Home } from "./Pages";
import SingleHotelPage from "./Pages/SingleHotel/SingleHotelPage";

export const routes = [
	{ path: "", element: <Home /> },
	{
		path: "hotels/:name/:address/:id", // Just For Navigation No Backend Involved Here
		element: <SingleHotelPage />,
	},
];

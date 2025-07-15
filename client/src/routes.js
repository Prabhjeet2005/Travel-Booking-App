import { Home } from "./Pages";
import SingleHotelPage from "./Pages/SingleHotel/SingleHotelPage";

export const routes = [
	{ path: "", element: <Home /> },
	{ path: "hotels/:id", element: <SingleHotelPage /> },
];

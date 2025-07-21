import Filters from "./Components/Filters/Filters";
import Login from "./Components/Login/Login";
import { Home } from "./Pages";
import LoginSignupPg from "./Pages/LoginSignup/LoginSignupPg";
import SearchResult from "./Pages/SearchResults/SearchResult";
import SingleHotelPage from "./Pages/SingleHotel/SingleHotelPage";

export const routes = [
	{ path: "", element: <Home /> },
	{
		path: "/hotels/:name/:address/:id", // Just For Navigation No Backend Involved Here
		element: <SingleHotelPage />,
	},
	{ path: "/hotels/searchResults/:address", element: <SearchResult /> },
	{ path: "/filters", element: <Filters /> },
	{path:"/login",element:<LoginSignupPg />},
	{path:"/signup",element:<LoginSignupPg />}
];

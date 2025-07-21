import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/UserContextProvider";
import { routes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryContextProvider from "./context/CategoryContextProvider";
import DateContextProvider from "./context/DateContext";
import FilterContextProvider from "./context/FilterContext";
import { AuthContextProvider } from "./context/AuthContext";
import WishlistContextProvider from "./context/WishlistContext";
import HotelContextProvider from "./context/HotelContext";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: routes,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<UserContextProvider>
		<AuthContextProvider>
			<WishlistContextProvider>
				<CategoryContextProvider>
					<DateContextProvider>
						<FilterContextProvider>
							<HotelContextProvider>
								<RouterProvider router={router}>
									<App />
								</RouterProvider>
							</HotelContextProvider>
						</FilterContextProvider>
					</DateContextProvider>
				</CategoryContextProvider>
			</WishlistContextProvider>
		</AuthContextProvider>
	</UserContextProvider>
);

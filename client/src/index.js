import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/UserContextProvider";
import { routes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryContextProvider from "./context/CategoryContextProvider";

const router = createBrowserRouter([
  {
   path:"/",
    element:<App />,
    children:routes
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<UserContextProvider>
		<CategoryContextProvider>
			<RouterProvider router={router}>
				<App />
			</RouterProvider>
		</CategoryContextProvider>
	</UserContextProvider>
);

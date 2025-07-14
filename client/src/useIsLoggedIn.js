import { useContext } from "react";
import { UserContext } from "./context/UserContextProvider";

export const useIsLoggedIn = () => {
	const { userData } = useContext(UserContext);
	return !!userData?.email;
};

import React, { createContext, useState } from "react";

export const UserContext = createContext({
	userData: null,
	message: null,
	success: null,
	isLoading: null,
	setUserData: () => {},
	setMessage: () => {},
	setSuccess: () => {},
	setIsLoading: () => {},
});

const UserContextProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);
	const [message, setMessage] = useState(null);
	const [success, setSuccess] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	return (
		<UserContext.Provider
			value={{
				userData,
				message,
				success,
				isLoading,
				setUserData,
				setMessage,
				setSuccess,
				setIsLoading,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;

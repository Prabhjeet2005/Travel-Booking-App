import { createContext, useReducer } from "react";
import { authReducer } from "../reducer/authReducer";

const initialValue = {
	name: { value: "", isValid: false },
	email: { value: "", isValid: false },
	phone: { value: null, isValid: false },
	password: {
		value: "",
		isValid: false,
		allValidate: {
			hasLowerCase: false,
			hasUpperCase: false,
			hasDigits: false,
			hasSpecialChar: false,
			hasMinLength: false,
		},
	},
	isUserLoggedIn: localStorage.getItem("isUserLoggedIn") === "true",
	accessToken: localStorage.getItem("accessToken") || "",
};
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [
		{ name, email, phone, password, isUserLoggedIn, accessToken },
		authDispatch,
	] = useReducer(authReducer, initialValue);
	return (
		<AuthContext.Provider
			value={{
				name,
				email,
				phone,
				password,
				isUserLoggedIn,
				accessToken,
				authDispatch,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

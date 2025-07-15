import { useContext, useEffect } from "react";
import { axiosInstance, ENDPOINTS, REQUEST_TYPES } from "./apiUtils";
import { UserContext } from "./context/UserContextProvider";

const useApi = (url, type = REQUEST_TYPES.GET) => {
	const {
		userData,
		message,
		success,
		isLoading,
		setUserData,
		setMessage,
		setSuccess,
		setIsLoading,
	} = useContext(UserContext);

	// useEffect(() => {
	// 	console.log("Hotels from context:", userData);
	//   console.log("isLoading: ",isLoading)
	// }, [userData,isLoading]);

	const makeRequest = async (payload) => {
		try {
			setIsLoading(true);
			const apiData = (await axiosInstance[type](url, payload)).data;
			const { data, message, success } = apiData;
			setSuccess(success);
			setMessage(message);
			if (data) {
				setUserData(data);
			}
			if (url === ENDPOINTS.USERS.LOGOUT) {
				setUserData(null);
			}
			return data;
		} catch (error) {
			setSuccess(false);
			if (error?.response?.data?.message) {
				setMessage(error?.response?.data?.message);
			}
		} finally {
			setIsLoading(false);

		}
	};
	return { makeRequest, isLoading, success, message, userData };
};

export default useApi;

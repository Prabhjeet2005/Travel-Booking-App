import { emailPattern, lowerCase, lowerCasePattern, namePattern, numberExistsPattern, phonePattern, specialCharPattern, upperCase, upperCasePattern } from "../utlis/regex";

export const authReducer = (state, { type, payload }) => {
	switch (type) {
		case "NAME":
			return {
				...state,
				name: { value: payload, isValid: namePattern.test(payload) },
			};
		case "EMAIL":
			return {
				...state,
				email: { value: payload, isValid: emailPattern.test(payload) },
			};
		case "PASSWORD":
			return {
				...state,
				password: {
					value: payload,
					allValidate: {
						hasLowerCase: lowerCasePattern.test(payload),
						hasUpperCase: upperCasePattern.test(payload),
						hasDigits: numberExistsPattern.test(payload),
						hasSpecialChar: specialCharPattern.test(payload),
						hasMinLength: payload.length >= 8,
					},
					isValid:
						lowerCasePattern.test(payload) &&
						upperCasePattern.test(payload) &&
						numberExistsPattern.test(payload) &&
						specialCharPattern.test(payload) &&
						payload.length >= 8,
				},
			};

		case "PHONE":
			return {
				...state,
				phone: { value: payload, isValid: phonePattern.test(payload) },
			};
		case "CLEAR_INPUT":
			return {
				...state,
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
			};

      case "LOGGED_IN":
        return { ...state, isUserLoggedIn:payload};
      case "LOGOUT":
				localStorage.removeItem("isUserLoggedIn");
				localStorage.removeItem("accessToken");
				localStorage.removeItem("userData");
        return { ...state,isUserLoggedIn:false}
		default:
			return state;
	}
};

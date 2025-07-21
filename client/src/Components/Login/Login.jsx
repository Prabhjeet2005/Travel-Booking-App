import React, { useContext, useState } from "react";
import { EnvelopeAt, Eye, EyeSlash } from "react-bootstrap-icons";

import "./Login.css";
import { useNavigate } from "react-router";
import useApi from "../../useApi";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import { UserContext } from "../../context/UserContextProvider";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
	const [showPassword, setShowPassword] = useState("password");
	const handleTogglePassword = () => {
		if (showPassword === "password") {
			setShowPassword("text");
		} else {
			setShowPassword("password");
		}
	};

	const { email, password, authDispatch } = useContext(AuthContext);
	const handleEmailChange = (e) => {
		authDispatch({
			type: "EMAIL",
			payload: e.target.value,
		});
	};
	const handlePasswordChange = (e) => {
		authDispatch({
			type: "PASSWORD",
			payload: e.target.value,
		});
	};
	console.log({ email: email.value, password: password.value });
	const navigate = useNavigate();
	const handleTakeToSignupClick = () => {
		navigate("/signup");
	};

	const { makeRequest } = useApi(ENDPOINTS.USERS.LOGIN, REQUEST_TYPES.POST);
	const { success, userData } = useContext(UserContext);

	const handleLoginClick = (e) => {
		e.preventDefault();
		try {
			(async () => {
				const payload = { email: email.value, password: password.value };
				const loginRequest = await makeRequest(payload);
				if (loginRequest) {
					authDispatch({
						type: "CLEAR_INPUT",
					});
					authDispatch({
						type:"LOGGED_IN",
						payload:true
					})
					navigate("/");
				}
			})();
		} catch (error) {
			console.log(error);
		}
	};

	const handleLoginWithCredentialClick = (e)=>{
		e.preventDefault();
		const testCredentials = {email:"test@gmail.com",password:"Qwerty@123"}
		try{
		(async () => {
				const loginRequest = await makeRequest(testCredentials);
				if (loginRequest) {
					authDispatch({
						type: "CLEAR_INPUT",
					});
					authDispatch({
						type:"LOGGED_IN",
						payload:true
					})
					navigate("/");
				}
			})();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<section className="background">
			<section className="login-title">LOGIN</section>
			<form className="login-container" action="">
				<section className="form-body">
					<section className="form-item">
						<label htmlFor="email">Email</label>
						<input
							className="email input-item"
							id="email"
							placeholder="Enter Email"
							value={email.value}
							onChange={(e) => handleEmailChange(e)}
							required
						/>
						<EnvelopeAt className="input-icons" />
					</section>
					<section className="form-item">
						<label htmlFor="password">Password</label>
						<input
							className="password input-item"
							id="password"
							type={showPassword}
							placeholder="Enter Password"
							value={password.value}
							onChange={(e) => handlePasswordChange(e)}
							required
						/>
						{showPassword === "password" ? (
							<EyeSlash
								onClick={handleTogglePassword}
								className="input-icons"
							/>
						) : (
							<Eye onClick={handleTogglePassword} className="input-icons" />
						)}
					</section>
				</section>
				<section className="login-footer">
					<button onClick={(e) => handleLoginClick(e)} className="login-btn">
						Login
					</button>

					<button onClick={(e)=>handleLoginWithCredentialClick(e)} className="login-test">Login With Test Credentials</button>

					<section onClick={handleTakeToSignupClick} className="not-registered">
						Not Registered? Signup Now!
					</section>
				</section>
			</form>
		</section>
	);
};

export default Login;

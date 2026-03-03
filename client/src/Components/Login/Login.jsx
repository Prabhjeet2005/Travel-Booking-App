import React, { useContext, useState } from "react";
import {
	EnvelopeAt,
	Eye,
	EyeSlash,
	BriefcaseFill,
	SendFill,
} from "react-bootstrap-icons";
import "./Login.css";
import { useNavigate } from "react-router";
import useApi from "../../useApi";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import { UserContext } from "../../context/UserContextProvider";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
	const [showPassword, setShowPassword] = useState("password");
	const handleTogglePassword = () => {
		setShowPassword(showPassword === "password" ? "text" : "password");
	};

	const { email, password, authDispatch } = useContext(AuthContext);

	const handleEmailChange = (e) =>
		authDispatch({ type: "EMAIL", payload: e.target.value });
	const handlePasswordChange = (e) =>
		authDispatch({ type: "PASSWORD", payload: e.target.value });

	const navigate = useNavigate();
	const { makeRequest } = useApi(
		ENDPOINTS.USERS.LOGIN,
		REQUEST_TYPES.POST,
	);

	const handleLoginClick = async (e) => {
		e.preventDefault();
		try {
			const payload = { email: email.value, password: password.value };
			const loginRequest = await makeRequest(payload);
			if (loginRequest) {
				localStorage.setItem("isUserLoggedIn", "true");
				authDispatch({ type: "CLEAR_INPUT" });
				authDispatch({ type: "LOGGED_IN", payload: true });
				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleLoginWithCredentialClick = async (e) => {
		e.preventDefault();
		const testCredentials = {
			email: "test@gmail.com",
			password: "Qwerty@123",
		};
		try {
			const loginRequest = await makeRequest(testCredentials);
			if (loginRequest) {
				localStorage.setItem("isUserLoggedIn", "true");
				authDispatch({ type: "CLEAR_INPUT" });
				authDispatch({ type: "LOGGED_IN", payload: true });
				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="auth-background">
			<div className="auth-card">
				{/* Brand Header */}
				<div className="auth-header">
					<div className="auth-logo" onClick={() => navigate("/")}>
						Journeaze <SendFill className="text-orange-400" />
					</div>
					<h1 className="auth-title">Welcome back</h1>
				</div>

				<form className="auth-form">
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<div className="input-wrapper">
							<input
								id="email"
								className="auth-input"
								placeholder="Enter your email"
								value={email.value}
								onChange={handleEmailChange}
								required
							/>
							<EnvelopeAt className="input-icon" />
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<div className="input-wrapper">
							<input
								id="password"
								className="auth-input"
								type={showPassword}
								placeholder="Enter your password"
								value={password.value}
								onChange={handlePasswordChange}
								required
							/>
							{showPassword === "password" ? (
								<EyeSlash
									onClick={handleTogglePassword}
									className="input-icon cursor-pointer hover:text-gray-800"
								/>
							) : (
								<Eye
									onClick={handleTogglePassword}
									className="input-icon cursor-pointer hover:text-gray-800"
								/>
							)}
						</div>
					</div>

					<button
						onClick={handleLoginClick}
						className="auth-primary-btn mt-4">
						Sign In
					</button>

					<div className="auth-divider">
						<span>or</span>
					</div>

					{/* ✅ Sleek Recruiter Button */}
					<button
						onClick={handleLoginWithCredentialClick}
						className="auth-recruiter-btn">
						<BriefcaseFill /> 1-Click Recruiter Login
					</button>

					<div className="auth-footer-text">
						Don't have an account?{" "}
						<span onClick={() => navigate("/signup")}>Sign up</span>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Login;

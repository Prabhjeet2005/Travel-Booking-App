import React, { useContext, useState } from "react";
import {
	AlphabetUppercase,
	EnvelopeAt,
	Eye,
	EyeSlash,
	Telephone,
	CheckCircleFill,
	XCircleFill,
	SendFill,
} from "react-bootstrap-icons";
import "./Signup.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import useApi from "../../useApi";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import { UserContext } from "../../context/UserContextProvider";

const Signup = () => {
	const [showPassword, setShowPassword] = useState("password");
	const handleTogglePassword = () =>
		setShowPassword(showPassword === "password" ? "text" : "password");

	const { name, email, phone, password, authDispatch } =
		useContext(AuthContext);

	const handleChange = (type, value) =>
		authDispatch({ type, payload: value });
	const navigate = useNavigate();
	const { makeRequest } = useApi(
		ENDPOINTS.USERS.SIGNUP,
		REQUEST_TYPES.POST,
	);
	const { success } = useContext(UserContext);

	const handleSignupButtonClick = async (e) => {
		e.preventDefault();
		try {
			const payload = {
				name: name.value,
				email: email.value,
				password: password.value,
				phone: phone.value,
			};
			if (
				name.isValid &&
				email.isValid &&
				phone.isValid &&
				password.isValid
			) {
				const signupRequest = await makeRequest(payload);
				if (signupRequest) {
					authDispatch({ type: "CLEAR_INPUT" });
					if (success) navigate("/login");
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const ValidationItem = ({ isValid, text }) => (
		<div className={`validation-item ${isValid ? "valid" : "invalid"}`}>
			{isValid ? <CheckCircleFill /> : <XCircleFill />} {text}
		</div>
	);

	return (
		<section className="auth-background">
			<div className="auth-card signup-card">
				<div className="auth-header">
					<div className="auth-logo" onClick={() => navigate("/")}>
						Journeaze <SendFill className="text-orange-500" />
					</div>
					<h1 className="auth-title">Create an account</h1>
				</div>

				<form className="auth-form">
					<div className="form-group">
						<label htmlFor="name">Full Name</label>
						<div className="input-wrapper">
							<input
								className="auth-input"
								id="name"
								placeholder="John Doe"
								value={name.value}
								onChange={(e) => handleChange("NAME", e.target.value)}
								required
							/>
							<AlphabetUppercase className="input-icon" />
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="email">Email</label>
						<div className="input-wrapper">
							<input
								className="auth-input"
								id="email"
								placeholder="john@example.com"
								value={email.value}
								onChange={(e) => handleChange("EMAIL", e.target.value)}
								required
							/>
							<EnvelopeAt className="input-icon" />
						</div>
						{!email.isValid && email.value !== "" && (
							<span className="error-text">
								Please enter a valid email.
							</span>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="phone">Phone Number</label>
						<div className="input-wrapper">
							<input
								className="auth-input"
								type="number"
								id="phone"
								placeholder="10-digit number"
								value={phone.value}
								onChange={(e) => handleChange("PHONE", e.target.value)}
								required
							/>
							<Telephone className="input-icon" />
						</div>
						{!phone.isValid &&
							phone.value !== null &&
							phone.value !== "" && (
								<span className="error-text">
									Must be exactly 10 digits.
								</span>
							)}
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<div className="input-wrapper">
							<input
								className="auth-input"
								type={showPassword}
								id="password"
								placeholder="Create a strong password"
								value={password.value}
								onChange={(e) => handleChange("PASSWORD", e.target.value)}
								required
							/>
							{showPassword === "password" ? (
								<EyeSlash
									onClick={handleTogglePassword}
									className="input-icon cursor-pointer"
								/>
							) : (
								<Eye
									onClick={handleTogglePassword}
									className="input-icon cursor-pointer"
								/>
							)}
						</div>
					</div>

					{/* ✅ Sleek Password Validation Box */}
					<div className="password-validation-box">
						<ValidationItem
							isValid={password.allValidate.hasMinLength}
							text="At least 8 characters"
						/>
						<ValidationItem
							isValid={password.allValidate.hasUpperCase}
							text="One uppercase letter"
						/>
						<ValidationItem
							isValid={password.allValidate.hasLowerCase}
							text="One lowercase letter"
						/>
						<ValidationItem
							isValid={password.allValidate.hasDigits}
							text="One number"
						/>
						<ValidationItem
							isValid={password.allValidate.hasSpecialChar}
							text="One special character"
						/>
					</div>

					<button
						onClick={handleSignupButtonClick}
						className="auth-primary-btn"
						disabled={
							!(
								name.isValid &&
								email.isValid &&
								phone.isValid &&
								password.isValid
							)
						}>
						Agree and continue
					</button>

					<div className="auth-footer-text">
						Already have an account?{" "}
						<span onClick={() => navigate("/login")}>Log in</span>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Signup;

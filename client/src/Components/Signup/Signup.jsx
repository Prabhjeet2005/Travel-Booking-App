import React, { useContext, useEffect, useState } from "react";
import {
	Alphabet,
	AlphabetUppercase,
	EnvelopeAt,
	Eye,
	EyeSlash,
	Telephone,
} from "react-bootstrap-icons";

import "./Signup.css";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router";
import useApi from "../../useApi";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import { UserContext } from "../../context/UserContextProvider";
const Signup = () => {
	const [showPassword, setShowPassword] = useState("password");

	const handleTogglePassword = () => {
		if (showPassword === "password") {
			setShowPassword("text");
		} else {
			setShowPassword("password");
		}
	};

	const { name, email, phone, password, authDispatch } =
		useContext(AuthContext);

	const handleNameChange = (e) => {
		authDispatch({
			type: "NAME",
			payload: e.target.value,
		});
	};
	const handleEmailChange = (e) => {
		authDispatch({
			type: "EMAIL",
			payload: e.target.value,
		});
	};
	const handlePhoneChange = (e) => {
		authDispatch({
			type: "PHONE",
			payload: e.target.value,
		});
	};
	const handlePasswordChange = (e) => {
		authDispatch({
			type: "PASSWORD",
			payload: e.target.value,
		});
	};

	const navigate = useNavigate();
	const handleTakeToLoginClick = () => {
		navigate("/login");
	};

	const { makeRequest } = useApi(ENDPOINTS.USERS.SIGNUP, REQUEST_TYPES.POST);
	const { success } = useContext(UserContext);
	const handleSignupButtonClick = (e) => {
		e.preventDefault();
		try {
			(async () => {
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
						authDispatch({
							type: "CLEAR_INPUT",
						});
						if (success) {
							navigate("/login");
						}
					}
				}
			})();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="background">
			<section className="login-title">SIGNUP</section>
			<form className="login-container" action="sign">
				<section className="form-body">
					<section className="form-item">
						<label htmlFor="name">Name</label>
						<input
							onChange={(e) => handleNameChange(e)}
							value={name.value}
							className="email input-item"
							id="name"
							placeholder="Enter Name"
							required
						/>
						<AlphabetUppercase className="input-icons abc" />
					</section>
					<section className="form-item">
						<label htmlFor="email">Email</label>
						<input
							className="email input-item"
							onChange={(e) => handleEmailChange(e)}
							value={email.value}
							id="email"
							placeholder="Enter Email"
							required
						/>
						<EnvelopeAt className="input-icons" />
						{!email.isValid && email.value !== "" && (
							<section className="invalid not-correct">Invalid Email</section>
						)}
					</section>
					<section className="form-item">
						<label htmlFor="phone">Phone</label>
						<input
							className="email input-item"
							onChange={(e) => handlePhoneChange(e)}
							value={phone.value}
							maxLength={10}
							type="number"
							id="phone"
							placeholder="Enter Phone Number"
							required
						/>
						<Telephone className="input-icons" />
						{!phone.isValid && phone.value !== null && (
							<section className="invalid not-correct">
								Invalid Phone Number
							</section>
						)}
					</section>
					<section className="form-item ">
						<label htmlFor="password">Password</label>
						<input
							className="password input-item"
							onChange={(e) => handlePasswordChange(e)}
							value={password.value}
							id="password"
							type={showPassword}
							placeholder="Enter Password"
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

					<section className="password-container">
						<section
							className={`${
								password.allValidate.hasLowerCase ? "correct" : "not-correct"
							}`}>
							Atleast 1 LowerCase
						</section>

						<section
							className={`${
								password.allValidate.hasUpperCase ? "correct" : "not-correct"
							}`}>
							Atleast 1 UpperCase
						</section>
						<section
							className={`${
								password.allValidate.hasDigits ? "correct" : "not-correct"
							}`}>
							Atleast 1 Digit
						</section>
						<section
							className={`${
								password.allValidate.hasSpecialChar ? "correct" : "not-correct"
							}`}>
							Atleast 1 Special Character
						</section>
						<section
							className={`${
								password.allValidate.hasMinLength ? "correct" : "not-correct"
							}`}>
							Min Length of 8 Characters
						</section>
					</section>
				</section>
				<section className="login-footer">
					<button
						onClick={(e) => handleSignupButtonClick(e)}
						className="login-btn"
            disabled={!(name.isValid &&
					email.isValid &&
					phone.isValid &&
					password.isValid)}
            >
						Signup
					</button>

					<section onClick={handleTakeToLoginClick} className="not-registered">
						Already a user? Login
					</section>
				</section>
			</form>
		</section>
	);
};

export default Signup;

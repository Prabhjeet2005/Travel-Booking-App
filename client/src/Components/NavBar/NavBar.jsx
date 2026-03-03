import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, ButtonGroup } from "react-bootstrap";
import {
	SendFill,
	SignpostSplit,
	Calendar4Week,
	PersonAdd,
	Power,
	Heart,
	Luggage,
} from "react-bootstrap-icons";
import "./style.css";
import { useLocation, useNavigate } from "react-router";
import useApi from "../../useApi";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import { DateContext } from "../../context/DateContext";
import SearchStayWithDate from "../SearchStayWithDate/SearchStayWithDate";
import { AuthContext } from "../../context/AuthContext";
import { WishlistContext } from "../../context/WishlistContext";

export const NavBar = () => {
	const { makeRequest: logoutRequest } = useApi(
		ENDPOINTS.USERS.LOGOUT,
		REQUEST_TYPES.POST,
	);
	const { isSearchModalOpen, dateDispatch } = useContext(DateContext);
	const searchStayOpenHandler = () => {
		dateDispatch({ type: "OPEN_SEARCH_MODAL" });
	};
	const { destination, guests, checkInDate, checkOutDate } =
		useContext(DateContext);

	const { pathname } = useLocation();
	const navigate = useNavigate();
	const handleLoginClick = () =>
		navigate("/login", { pathFrom: { pathname } });
	const handleSignupClick = () =>
		navigate("/signup", { pathFrom: { pathname } });

	const { isUserLoggedIn, authDispatch } = useContext(AuthContext);
	const { wishlistDispatch } = useContext(WishlistContext);

	const handleLogoutClick = () => {
		try {
			(async () => {
				const logoutSuccess = await logoutRequest();
				if (logoutSuccess) {
					authDispatch({ type: "LOGOUT" });
					dateDispatch({ type: "CLEAR_ALL_INPUT" });
					wishlistDispatch({ type: "CLEAR_ALL_INPUTS" });
					navigate("/");
				}
			})();
		} catch (error) {}
	};

	const handleLogoClick = () => navigate("/");

	return (
		<Navbar fixed="top" expand="md" className="NavbarColor position">
			<Container fluid className="d-flex justify-between">
				<Navbar.Brand className="navbar-heading" onClick={handleLogoClick}>
					Journeaze <SendFill className="airplane" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ms-auto navbar-space align-items-center">
						<ButtonGroup
							aria-label="Basic example"
							className="button-container"
							onClick={searchStayOpenHandler}>
							<Button variant="secondary" className="button-item">
								<SignpostSplit /> {destination || "Destination"}
							</Button>
							<Button variant="secondary" className="button-item">
								<Calendar4Week />
								{checkInDate && checkOutDate
									? `${checkInDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })} - ${checkOutDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })}`
									: "Days"}{" "}
							</Button>
							<Button variant="secondary" className="button-item">
								<PersonAdd />
								{guests === 0 ? "" : guests}{" "}
								{guests > 1 ? "Guests" : "Guest"}
							</Button>
						</ButtonGroup>

						{/* ✅ NEW: Industry Standard Placement for User Actions */}
						{isUserLoggedIn ? (
							<>
								<Nav.Link
									onClick={() => navigate("/wishlist")}
									className="nav-action-link">
									<Heart className="nav-icon" /> Wishlist
								</Nav.Link>
								<Nav.Link
									onClick={() => navigate("/order-summary")}
									className="nav-action-link">
									<Luggage className="nav-icon" /> Trips
								</Nav.Link>
								<Nav.Link
									onClick={handleLogoutClick}
									className="logout-btn">
									Logout <Power />
								</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link
									onClick={handleLoginClick}
									className="nav-action-link">
									Login
								</Nav.Link>
								<Nav.Link
									onClick={handleSignupClick}
									className="nav-action-link">
									Signup
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
				{isSearchModalOpen && <SearchStayWithDate />}
			</Container>
		</Navbar>
	);
};

import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button, ButtonGroup, Col, Form, Row } from "react-bootstrap";
import {
	Search,
	Person,
	MenuApp,
	List,
	SendFill,
	SignpostSplit,
	Calendar4Week,
	PersonAdd,
	Power,
	BoxArrowRight,
} from "react-bootstrap-icons";
import "./style.css";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { useIsLoggedIn } from "../../useIsLoggedIn";
import useApi from "../../useApi";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import { DateContext } from "../../context/DateContext";
import SearchStayWithDate from "../SearchStayWithDate/SearchStayWithDate";
import { AuthContext } from "../../context/AuthContext";

export const NavBar = () => {
	const isLoggedIn = useIsLoggedIn();
	const [, setSearchParams] = useSearchParams();
	const { makeRequest: logoutRequest } = useApi(
		ENDPOINTS.USERS.LOGOUT,
		REQUEST_TYPES.POST
	);
	const { isSearchModalOpen, dateDispatch } = useContext(DateContext);
	const searchStayOpenHandler = () => {
		dateDispatch({
			type: "OPEN_SEARCH_MODAL",
		});
	};
	const { destination, guests, checkInDate, checkOutDate } =
		useContext(DateContext);

	const { pathname } = useLocation();
	const navigate = useNavigate();
	const handleLoginClick = () => {
		navigate("/login", { pathFrom: { pathname } });
	};
	const handleSignupClick = () => {
		navigate("/signup", { pathFrom: { pathname } });
	};

	const { isUserLoggedIn,authDispatch } = useContext(AuthContext);
	const handleLogoutClick = ()=>{
		try {
			(async()=>{
				const logoutSuccess = await logoutRequest();
				if(logoutSuccess){
					authDispatch({
						type:"LOGOUT"
					})
				}
			})()
		} catch (error) {
			
		}
	}

	return (
		<Navbar fixed="top" expand="md" className="NavbarColor position">
			<Container fluid className="d-flex justify-between">
				<Navbar.Brand className="navbar-heading" href="/">
					Travel <SendFill className="airplane" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ms-auto navbar-space">
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
									? `${checkInDate.toLocaleDateString("en-US", {
											day: "numeric",
											month: "short",
									  })} - ${checkOutDate.toLocaleDateString("en-US", {
											day: "numeric",
											month: "short",
									  })}`
									: "Days"}{" "}
							</Button>
							<Button variant="secondary" className="button-item">
								<PersonAdd />
								{guests === 0 ? "" : guests} {guests > 1 ? "Guests" : "Guest"}
							</Button>
						</ButtonGroup>
						{isUserLoggedIn ? (
							<Nav.Link
								onClick={handleLogoutClick}
								className="logout-btn"
								href="#home">
								Logout <Power />
							</Nav.Link>
						) : (
							<>
								<Nav.Link onClick={handleLoginClick} className="color-white">
									Login
								</Nav.Link>
								<Nav.Link onClick={handleSignupClick} className="color-white">
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

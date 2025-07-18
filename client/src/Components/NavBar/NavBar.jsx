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
} from "react-bootstrap-icons";
import "./style.css";
import { Link, useSearchParams } from "react-router";
import { useIsLoggedIn } from "../../useIsLoggedIn";
import useApi from "../../useApi";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import { DateContext } from "../../context/DateContext";
import SearchStayWithDate from "../SearchStayWithDate/SearchStayWithDate";

export const NavBar = () => {
	const isLoggedIn = useIsLoggedIn();
	const [, setSearchParams] = useSearchParams();
	const { makeRequest: logoutRequest } = useApi(
		ENDPOINTS.USERS.LOGOUT,
		REQUEST_TYPES.POST
	);
	const {isSearchModalOpen, dateDispatch } = useContext(DateContext);
	const searchStayOpenHandler = () => {
		dateDispatch({
			type: "OPEN_SEARCH_MODAL",
		});
	};

	const { destination, guests, checkInDate, checkOutDate } =
		useContext(DateContext);

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
								{guests} {guests > 1 ? "Guests" : "Guest"}
							</Button>
						</ButtonGroup>
						<Form inline>
							<Row className="d-flex">
								<Col xs="auto">
									<Form.Control
										type="text"
										placeholder="Search"
										className=" searchBar"
										onChange={(e) =>
											setSearchParams({ search: e.target.value })
										}
									/>
								</Col>
								{/* <Col xs="auto" className="">
										<Button type="submit" variant="outline-success " >
											<Search />
										</Button>
									</Col> */}
							</Row>
						</Form>
						{isLoggedIn ? (
							<Nav.Link onClick={logoutRequest} className="" href="#home">
								Logout
							</Nav.Link>
						) : (
							<>
								<Nav.Link as={Link} to="login" className="" href="#home">
									Login
								</Nav.Link>
								<Nav.Link as={Link} to="signup" className="" href="#link">
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

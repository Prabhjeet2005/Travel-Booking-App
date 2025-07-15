import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Search, Person, MenuApp, List } from "react-bootstrap-icons";
import "./style.css";
import { Link, useSearchParams } from "react-router";
import { useIsLoggedIn } from "../../useIsLoggedIn";
import useApi from "../../useApi";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";

export const NavBar = () => {
	const isLoggedIn = useIsLoggedIn();
	const [, setSearchParams] = useSearchParams();
	const { makeRequest: logoutRequest } = useApi(
		ENDPOINTS.USERS.LOGOUT,
		REQUEST_TYPES.POST
	);

	return (
		<Navbar fixed="top" expand="md" className="NavbarColor position">
			<Container fluid className="d-flex justify-between">
				<Navbar.Brand className="navbar-heading" href="/">
					TravelApp
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ms-auto">
						<NavDropdown title="Filter" id="basic-nav-dropdown navDropDown">
							<NavDropdown.Item href="#action/3.1">Place</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.1">Week</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.1">Guests</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.1" className="">
								<Button className="findButton btn-danger NavbarColor">
									Apply Filter
								</Button>
							</NavDropdown.Item>
						</NavDropdown>
						<Form inline>
							<Row className="d-flex">
								<Col xs="auto">
									<Form.Control
										type="text"
										placeholder="Search"
										className=" outline-none"
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
			</Container>
		</Navbar>
	);
};

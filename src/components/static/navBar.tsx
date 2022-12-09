import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  // Other break points:
  // false, 'sm', 'md', 'lg', 'xl', 'xxl'
  const expandBreakpoint = "md";
  const paddingRight = { paddingRight: 20 };
  const pageTitle = "oneNUS";

  return (
    <Navbar
      collapseOnSelect
      expand={expandBreakpoint}
      bg="dark"
      variant="dark"
      fixed="top"
      // className="py-3"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/NUS_coat_of_arms.svg/800px-NUS_coat_of_arms.svg.png"
            width="25"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          {pageTitle}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Form className="d-flex" style={paddingRight}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <NavDropdown
              title="Account"
              align="end"
              id={`collasible-nav-dropdown`}
            >
              <NavDropdown.Item as={Link} to="/">
                UsernameHere
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/signin">
                Log in
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/signup">
                Sign up
              </NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to="#action5">FAQ</NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

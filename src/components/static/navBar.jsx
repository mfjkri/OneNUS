import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function NavBar() {
  // Other break points:
  // false, 'sm', 'md', 'lg', 'xl', 'xxl'
  const expandBreakpoint = "md";
  const paddingRight = { paddingRight: 20 };
  const pageTitle = "oneNUS";

  return (
    <Navbar
      key={expandBreakpoint}
      bg="dark"
      variant="dark"
      expand={expandBreakpoint}
      className="mb-3"
    >
      <Container fluid>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/NUS_coat_of_arms.svg/800px-NUS_coat_of_arms.svg.png"
                width="25"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              {pageTitle}
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-${expandBreakpoint}`}
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expandBreakpoint}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expandBreakpoint}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-expand-${expandBreakpoint}`}
            >
              {pageTitle}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
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
              <Nav.Link href="#action1">Home</Nav.Link>
              {/* <Nav.Link href="#action2">Link</Nav.Link> */}
              <NavDropdown
                title="Account"
                align="end"
                id={`offcanvasNavbarDropdown-expand-${expandBreakpoint} dropdown-menu-align-end`}
              >
                <NavDropdown.Item href="#action3">Log in</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Sign up</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">FAQ</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavBar;

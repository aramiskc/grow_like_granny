import { Signup } from "./SignUp";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { Nav, Navbar, Container } from "react-bootstrap";

export function Header() {
  return (
    <header>
      <Navbar bg="light" expand="lg" className="align-items-start">
        <Container>
          <Navbar.Brand href="#">Grow Like Granny Plantcare</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item className="mx-2">
                <Nav.Link href="#">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item className="mx-2">
                <Nav.Link href="#">About</Nav.Link>
              </Nav.Item>
              <Nav.Item className="mx-2">
                <Nav.Link href="#">Contact</Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Item className="mx-2">
                <Signup />
              </Nav.Item>
              <Nav.Item className="mx-2">
                <Login />
              </Nav.Item>
              <Nav.Item className="mx-2">
                <LogoutLink />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
